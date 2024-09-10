
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import DDItem from './DDItem';
import SortableDDItem from './SortableDDItem';
import { DDType } from './types';
import { ReactNode } from 'react';

type BoardSectionProps<T extends DDType> = {
  id: string
  items: T[];
  cardRenderer?: (item: T) => ReactNode
};

const BoardSection = <T extends DDType,>({ id, items, cardRenderer }: BoardSectionProps<T>) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box sx={{ padding: 2 }}>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <SortableDDItem id={item.id}>
                {cardRenderer ? cardRenderer(item) : <DDItem item={item} />}
              </SortableDDItem>
            </Box>
          ))}
        </div>
      </SortableContext>
    </Box>
  );
};

export default BoardSection;
