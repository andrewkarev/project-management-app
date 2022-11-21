import { ROUTES } from 'common/routes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Column from '../../components/Column';
import { FaLessThan } from 'react-icons/fa';
import NewColumn from '../../components/NewColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { initialColumns } from 'data/initialBoardData';
import { moveColumn, moveTask, reorderTasks } from 'utils/dnd-helper';
import { DndType } from 'common/dnd-types';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getColumns } from 'store/reducers/boardSlice';
import Loader from 'components/Loader';
import { scrollController } from 'utils/scrollController';
import ColumnModal from 'components/ColumnModal';
import { MdWarning } from 'react-icons/md';
import WarningModal from 'components/WarningModal';

const BoardPage = () => {
  const boardId = '637899303b52a5922e7c5655';
  const boardTitle = 'board title';
  const boardDescription = 'Booard description';
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.board.columns);
  const isPending = useAppSelector((state) => state.board.isPending);

  const [isModalOpened, setIsModalOpened] = useState(false);
  //const [isColumnDeleting, setIsColumnDeleting] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // switch (type) {
    //   case DndType.COLUMN:
    //     const newOrderedColumns = moveColumn(destination, draggableId, columns);
    //     if (!newOrderedColumns) return;
    //     setColumns(newOrderedColumns);
    //     return;
    //   case DndType.TASK:
    //     const sourceColumn = columns.find((item) => item._id == source.droppableId);
    //     if (!sourceColumn || !sourceColumn.tasks) return;
    //     if (destination.droppableId !== source.droppableId) {
    //       const { newSourceColumn, newDestinationColumn } = moveTask(
    //         source,
    //         destination,
    //         draggableId,
    //         sourceColumn,
    //         columns
    //       );
    //       if (!newSourceColumn || !newDestinationColumn) return;
    //       const newColumns = [
    //         ...columns.filter(
    //           (item) => item._id !== source.droppableId && item._id !== destination.droppableId
    //         ),
    //         newDestinationColumn,
    //         newSourceColumn,
    //       ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
    //       setColumns(newColumns);
    //     } else {
    //       const newSourceColumn = reorderTasks(destination, draggableId, sourceColumn);
    //       if (!newSourceColumn) return;
    //       const newColumns = [
    //         ...columns.filter((item) => item._id !== source.droppableId),
    //         newSourceColumn,
    //       ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
    //       setColumns(newColumns);
    //     }
    //     return;
    //   default:
    //     throw new Error('No such DND type');
    // }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(getColumns(boardId));
    };
    asyncFunc();
  }, [dispatch]);

  useEffect(() => {
    isPending ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isPending]);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.pageContent}>
          <div className={styles.topBlock}>
            <Link className={styles.backBtn} to={ROUTES.BOARDS}>
              <FaLessThan className={styles.backBtnIcon} />
              <span>Back</span>
            </Link>
            <div className={styles.boardInfo}>
              <h3 className={styles.title}>{`Board: ${boardTitle}`}</h3>
              <p className={styles.description}>{boardDescription}</p>
            </div>
          </div>
          <div className={styles.boardContent}>
            <Droppable droppableId={'columns'} direction="horizontal" type={DndType.COLUMN}>
              {(provided) => (
                <div
                  className={styles.columnsContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  id="column-container"
                >
                  {columns.map((column, index) => (
                    <Column key={column._id} item={column} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewColumn toggleModal={toggleModal} />
          </div>
        </div>
      </DragDropContext>
      {isPending && <Loader />}
      <ColumnModal
        modalActive={isModalOpened}
        boardId={boardId}
        setModalActive={setIsModalOpened}
      />
      {/* {isColumnDeleting && (
        <WarningModal
          deleteBtnHandler={() => console.log('delete the column')}
          cancelBtnHandler={() => setIsColumnDeleting(false)}
          message="delete this column"
        /> */}
      {/* )} */}
    </>
  );
};

export default BoardPage;
