import { useState } from 'react';

export default function useModalToggle() {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  return { isOpen, setOpen, toggle };
}
