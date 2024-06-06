import {useDraggable} from '@dnd-kit/core';


export default function Draggable({ children, id, className }: {children: React.ReactNode, id: number, className: string}) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id,
  });
  
  return (
    <div className={className} ref={setNodeRef}>
      {children}
    </div>
  );
}