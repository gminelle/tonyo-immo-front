import classNames from '@lib/class-names/ClassNames';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import scss from './custom-button.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INVISIBLE = 'invisible',
}

const muiVariantByVariant: Record<ButtonVariant, ButtonProps['variant']> = {
  [ButtonVariant.PRIMARY]: 'contained',
  [ButtonVariant.SECONDARY]: 'outlined',
  [ButtonVariant.INVISIBLE]: 'text',
};

type CustomButtonProps = {
  label: string,
  additionalClassname?: string,
  icon?: ReactNode,
  onClick?: () => void,
  variant?: ButtonVariant,
};

export default function CustomButton(
  {
    label,
    additionalClassname,
    icon,
    onClick,
    variant = ButtonVariant.PRIMARY,
  }: Readonly<CustomButtonProps>,
) {
  return (
    <Button
      type={onClick ? 'button' : 'submit'}
      className={classNames(scss.customButton, additionalClassname)}
      startIcon={icon}
      variant={muiVariantByVariant[variant]}
      onClick={onClick}
      size="small"
    >
      {label}
    </Button>
  );
}
