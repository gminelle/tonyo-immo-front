import DropdownMenu, { DropdownMenuItem } from '@components/theme/dropdown-menu/DropdownMenu';
import classNames from '@lib/class-names/ClassNames';
import scss from './user-selector.module.scss';

type UserSelectorProps = {
  name: string,
  imageUrl?: string,
  imageAlt?: string,
  items: DropdownMenuItem[],
  className?: string,
  align?: 'start' | 'end',
};

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .filter((part: string) => part.length > 0)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase() ?? '')
    .join('');

  return initials || '?';
}

export default function UserSelector(
  {
    name,
    imageUrl,
    imageAlt,
    items,
    className,
    align = 'end',
  }: UserSelectorProps,
) {
  const triggerContent = (
    <span className={classNames(scss.userSelectorTrigger, className)}>
      {
        imageUrl
          ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? `${name} avatar`}
              className={scss.userSelectorAvatar}
            />
          )
          : (
            <span className={scss.userSelectorFallbackAvatar} aria-hidden="true">
              {getInitials(name)}
            </span>
          )
      }
      <span className={scss.userSelectorName}>{name}</span>
      <span className={scss.userSelectorChevron} aria-hidden="true">v</span>
    </span>
  );

  return (
    <DropdownMenu
      triggerContent={triggerContent}
      items={items}
      align={align}
      triggerClassName={scss.userSelectorButton}
      menuLabel={`${name} menu`}
    />
  );
}
