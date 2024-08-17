
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Typography from '@mui/material/Typography';
import { Ticket } from '../../sections/tickets/ticketService';
import DDItem from './DDItem';
import SortableDDItem from './SortableDDItem';

type BoardSectionProps = {
  id: string;
  title: string;
  items: Ticket[];
};

const BoardSection = ({ id, title, items }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box sx={{ backgroundColor: '#eee', padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <SortableDDItem id={item.id}>
                <DDItem item={item} />
              </SortableDDItem>
            </Box>
          ))}
        </div>
      </SortableContext>
    </Box>
  );
};

export default BoardSection;
