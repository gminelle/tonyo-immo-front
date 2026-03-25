import classNames from '@lib/class-names/ClassNames';
import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import scss from './dropdown-menu.module.scss';

export type DropdownMenuItem = {
  id: string,
  label: ReactNode,
  onSelect: () => void,
  disabled?: boolean,
};

type DropdownMenuProps = {
  triggerContent: ReactNode,
  items: DropdownMenuItem[],
  align?: 'start' | 'end',
  className?: string,
  menuClassName?: string,
  triggerClassName?: string,
  menuLabel: string,
};

export default function DropdownMenu(
  {
    triggerContent,
    items,
    align = 'end',
    className,
    menuClassName,
    triggerClassName,
    menuLabel,
  }: DropdownMenuProps,
) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((currentValue: boolean) => !currentValue);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleItemSelect = (item: DropdownMenuItem) => {
    if (item.disabled) {
      return;
    }

    item.onSelect();
    setIsOpen(false);
  };

  return (
    <div className={classNames(scss.dropdownMenu, className)} ref={rootRef}>
      <button
        type="button"
        className={classNames(scss.dropdownMenuTrigger, triggerClassName)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
      >
        {triggerContent}
      </button>

      {
        isOpen
          ? (
            <div
              id={menuId}
              className={classNames(
                scss.dropdownMenuPanel,
                align === 'start' ? scss.dropdownMenuPanelStart : scss.dropdownMenuPanelEnd,
                menuClassName,
              )}
              role="menu"
              aria-label={menuLabel}
            >
              {
                items.map((item: DropdownMenuItem) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    className={scss.dropdownMenuItem}
                    onClick={() => handleItemSelect(item)}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </button>
                ))
              }
            </div>
          )
          : null
      }
    </div>
  );
}
