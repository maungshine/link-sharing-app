import {useDroppable} from '@dnd-kit/core';


export default function Droppable({children, id} : {children: React.ReactNode, id: number }) {
  const {setNodeRef} = useDroppable({
    id,
  });
  
  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}