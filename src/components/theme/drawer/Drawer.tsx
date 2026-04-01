import classNames from '@lib/class-names/ClassNames';
import useMessages from '@i18n/hooks/messagesHook';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { ReactNode, useId } from 'react';
import scss from './drawer.module.scss';

export type DrawerProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  title?: ReactNode,
  ariaLabel?: string,
  position?: 'left' | 'right',
  width?: string,
  className?: string,
  panelClassName?: string,
  closeOnOverlayClick?: boolean,
  showCloseButton?: boolean,
  zIndex?: number,
};

export default function Drawer(
  {
    isOpen,
    onClose,
    children,
    title,
    ariaLabel,
    position = 'right',
    width,
    className,
    panelClassName,
    closeOnOverlayClick = true,
    showCloseButton = true,
    zIndex,
  }: Readonly<DrawerProps>,
) {
  const { messages } = useMessages();
  const titleId: string = useId();
  const handleClose: NonNullable<MuiDrawerProps['onClose']> = (
    _event: {},
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (!closeOnOverlayClick && reason === 'backdropClick') {
      return;
    }

    onClose();
  };

  return (
    <MuiDrawer
      anchor={position}
      open={isOpen}
      onClose={handleClose}
      className={classNames(scss.drawer, className)}
      slotProps={{
        backdrop: {
          className: scss.drawerOverlay,
        },
        paper: {
          className: classNames(
            scss.drawerPanel,
            position === 'left' ? scss.drawerPanelLeft : scss.drawerPanelRight,
            panelClassName,
          ),
          style: width === undefined ? undefined : { width },
        },
      }}
      sx={zIndex === undefined ? undefined : { zIndex }}
    >
      <Box
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : (ariaLabel ?? messages.drawer.panel)}
        aria-labelledby={title ? titleId : undefined}
      >
        {
          title || showCloseButton
            ? (
              <Box className={scss.drawerHeader}>
                {
                  title
                    ? (
                      <Typography
                        id={titleId}
                        component="div"
                        className={scss.drawerTitle}
                      >
                        {title}
                      </Typography>
                    )
                    : null
                }
                {
                  showCloseButton
                    ? (
                      <IconButton
                        className={scss.drawerClose}
                        aria-label={messages.drawer.close}
                        onClick={onClose}
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )
                    : null
                }
              </Box>
            )
            : null
        }

        <Box className={scss.drawerContent}>
          {children}
        </Box>
      </Box>
    </MuiDrawer>
  );
}
