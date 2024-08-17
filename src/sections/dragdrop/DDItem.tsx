import { Card, CardContent } from '@mui/material';
import { Ticket } from '../../sections/tickets/ticketService';

type DDItemProps = {
  item: Ticket;
};

const DDItem = ({ item }: DDItemProps) => {
  return (
    <Card>
      <CardContent>id: {item.id}</CardContent>
      <CardContent>Description: {item.description}</CardContent>
    </Card>
  );
};

export default DDItem;