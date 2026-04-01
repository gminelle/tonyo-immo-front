import classNames from '@lib/class-names/ClassNames';
import useMessages from '@i18n/hooks/messagesHook';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { ReactNode, useId } from 'react';
import scss from './popin.module.scss';

export type PopinProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  title?: ReactNode,
  ariaLabel?: string,
  width?: string,
  height?: string,
  className?: string,
  paperClassName?: string,
  closeOnOverlayClick?: boolean,
  showCloseButton?: boolean,
  zIndex?: number,
};

export default function Popin(
  {
    isOpen,
    onClose,
    children,
    title,
    ariaLabel,
    width,
    height,
    className,
    paperClassName,
    closeOnOverlayClick = true,
    showCloseButton = true,
    zIndex,
  }: Readonly<PopinProps>,
) {
  const { messages } = useMessages();
  const titleId: string = useId();
  const handleClose: NonNullable<DialogProps['onClose']> = (
    _event: {},
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (!closeOnOverlayClick && reason === 'backdropClick') {
      return;
    }

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className={classNames(scss.popin, className)}
      slotProps={{
        backdrop: {
          className: scss.popinOverlay,
        },
        paper: {
          className: classNames(scss.popinContainer, paperClassName),
          style: {
            width,
            height,
          },
        },
      }}
      sx={zIndex === undefined ? undefined : { zIndex }}
      aria-label={title ? undefined : (ariaLabel ?? messages.popin.dialog)}
      aria-labelledby={title ? titleId : undefined}
    >
      {
        title || showCloseButton
          ? (
            <DialogTitle className={scss.popinHeader} id={title ? titleId : undefined}>
              <Box className={scss.popinTitle}>
                {title}
              </Box>
              {
                showCloseButton
                  ? (
                    <IconButton
                      className={scss.popinClose}
                      aria-label={messages.popin.close}
                      onClick={onClose}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )
                  : null
              }
            </DialogTitle>
          )
          : null
      }

      <DialogContent className={scss.popinContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
