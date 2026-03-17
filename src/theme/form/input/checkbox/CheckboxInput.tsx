import { Checkbox } from '@mui/material';
import { Controller, ControllerRenderProps, RegisterOptions, useFormContext } from 'react-hook-form';
import { FieldValues } from 'react-hook-form-mui';
import scss from '../form-input.module.scss';

type CheckboxInputProps = {
  name: string,
  rules?: RegisterOptions,
};

export default function CheckboxInput({ name, rules }: Readonly<CheckboxInputProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
        <Checkbox
          {...field}
          className={scss.checkbox}
        />
      )}
    />
  );
}
