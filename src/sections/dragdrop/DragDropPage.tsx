
import { useState, useEffect, useContext } from 'react';
import DragDropBoard from './DragDropBoard';
import MainCard from '../../components/MainCard';
import { Ticket, ticketService } from '../../sections/tickets/ticketService';
import { UserContext } from '../../components/contexts/UserContext';

// ==============================|| Drag Drop PAGE ||============================== //

const DragDropPage = () => {

  const NUM_TIX = 20;
  const [items, setItems] = useState<Ticket[]>([]);
  const { user } = useContext(UserContext);

  const categories = {
    new: 'new',
    inprogress: 'inprogress',
    completed: 'completed',
    blocked: 'blocked'
  };

  const handleChange = (c: Map<string, unknown>, t: Ticket) => {

    ticketService.update(user!, t!, c)
      .then(() => {
        console.log("ticket updated");
      })
  }

  useEffect(() => {
    ticketService.getAll(NUM_TIX)
        .then((tix) => setItems(tix));
  }, []);

  useEffect(() => {
   items.map(i=> i.status)
  }, [items]);

  return (
    <MainCard title="Drag Drop Sample"> 
      <DragDropBoard onChange={(c: Map<string, unknown>, t:Ticket)=> handleChange(c,t)} items={items} categories={categories}/>
    </MainCard>
  )
}

export default DragDropPage;
