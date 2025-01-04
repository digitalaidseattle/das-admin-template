
/**
 *  DragDropPage.tsx
 * 
 * This example shows how Drag-And-Drop can be used.  It uses Ticket as the item that is DragAndDroppable 
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, useContext, useEffect, useState } from 'react';
import { UserContext } from '@digitalaidseattle/core';
import { MainCard } from '@digitalaidseattle/mui';

import { Ticket, ticketService } from '../../sections/tickets/ticketService';
import { DragAndDrop, DDCategory, DDType } from '@digitalaidseattle/draganddrop';
import { Box, Card, CardContent, Typography } from '@mui/material';

// ==============================|| Drag Drop PAGE ||============================== //
type TicketWrapper = Ticket & DDType

const DragDropPage = () => {

  const NUM_TIX = 20;
  const [items, setItems] = useState<TicketWrapper[]>([]);
  const { user } = useContext<any>(UserContext);

  const categories: DDCategory<string>[] = [
    { label: 'New', value: 'new' },
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Blocked', value: 'blocked' }]

  const handleChange = (changes: Map<string, unknown>, ticket: TicketWrapper) => {
    // mapping avoid "hard-coding" the "status"
    const updates = new Map<string, unknown>();
    updates.set("status", changes.get("containerId"))
    ticketService.update(user!, ticket!, updates)
      .then(() => {
        console.log("ticket updated");
      })
  }

  useEffect(() => {
    ticketService.getAll(NUM_TIX)
      .then((tix) => setItems(tix.map(t => t as TicketWrapper)));
  }, []);

  useEffect(() => {
    items.map(i => i.status)
  }, [items]);

  const headerRenderer = (cat: DDCategory<string>): ReactNode => {
    return (
      <Box>
        <Typography variant="h6">Status: {cat.label}</Typography>
      </Box>
    )
  };

  const cardRenderer = (item: TicketWrapper): ReactNode => {
    return (<Card>
      <CardContent>
        <Typography>id: {item.id}</Typography>
        <Typography>description: {item.description}</Typography>
      </CardContent>
    </Card>)
  };

  return (
    <Box id="DnD" width="100%">
      <MainCard title="Drag Drop Sample">
        <DragAndDrop
          onChange={(c: Map<string, unknown>, t: TicketWrapper) => handleChange(c, t)}
          items={items}
          categories={categories}
          isCategory={(tix: TicketWrapper, cat: DDCategory<string>) => tix.status === cat.value}
          cardRenderer={cardRenderer}
          headerRenderer={headerRenderer} />
      </MainCard>
    </Box>
  )
}

export default DragDropPage;
