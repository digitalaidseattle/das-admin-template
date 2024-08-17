import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { BoardSections as BoardSectionsType } from './types';
import { findBoardSectionContainer } from './utils/board';
import BoardSection from './BoardSection';
import DDItem from './DDItem';
import { Ticket } from '../tickets/ticketService';
import { BoardSections } from './types';

type DragDropBoardProps = {
  categories: {};
  items: Ticket[];
  onChange: Function;
};

const DragDropBoard = ({ items, onChange, categories }: DragDropBoardProps) => {

const [boardSections, setBoardSections] =
    useState<BoardSectionsType>();

    useEffect(() => {
        const initialBoardSections = initializeBoard(items);
        setBoardSections(initialBoardSections);
    }, [items]);


  const [activeTicketId, setActiveTicketId] = useState<null | number>(null);

  const [changes, setChanges] = useState<Map<string, unknown>>(new Map());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTicketId(active.id as number);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections!,
      active.id as number
    );
    const overContainer = findBoardSectionContainer(
      boardSections!,
      over?.id as number
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }


    setBoardSections((boardSection) => {
      const activeItems = boardSection![activeContainer];
      const overItems = boardSection![overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection![activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection![overContainer].slice(0, overIndex),
          boardSections![activeContainer][activeIndex],
          ...boardSection![overContainer].slice(
            overIndex,
            boardSection![overContainer].length
          ),
        ],
      };
    });

  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections!,
      active.id as number
    );
    const overContainer = findBoardSectionContainer(
      boardSections!,
      over?.id as number
    );
    

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections![activeContainer].findIndex(
      (ticket) => ticket.id === active.id
    );
    const overIndex = boardSections![overContainer].findIndex(
      (ticket) => ticket.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection![overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    changes.set("status", active.data.current?.sortable.containerId);
    setChanges({ ...changes });

     // sends the changes back to be persisted outside drag and drop component
    onChange(changes, ticket);
    setChanges(new Map());

    setActiveTicketId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const getItemById = (tickets: Ticket[], id: number) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const ticket = activeTicketId ? getItemById(items, activeTicketId) : null;

  const initializeBoard = (tickets: Ticket[]) => {
    const boardSections: BoardSections = {};
  
    Object.keys(categories).forEach((boardSectionKey) => {
      boardSections[boardSectionKey] = getItemsByCategory(
        tickets,
        boardSectionKey
      );
    });
  
    return boardSections;
  };

  const getItemsByCategory = (tickets: Ticket[], status: String) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  
  

  return (
    boardSections &&
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={4}>
          {Object.keys(boardSections).map((boardSectionKey) => (
            <Grid item xs={3} key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                items={boardSections[boardSectionKey]}
              />
            </Grid>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {ticket ? <DDItem item={ticket} /> : null}
          </DragOverlay>
        </Grid>
      </DndContext>
    </Container>
  );
};

export default DragDropBoard;
