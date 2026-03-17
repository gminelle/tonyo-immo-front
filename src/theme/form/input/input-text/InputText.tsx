import useFormErrorParser from '@components/theme/form/hook/FormErrorParserHook';
import classNames from '@lib/class-names/ClassNames';
import { FieldError, RegisterOptions } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';

import scss from '../form-input.module.scss';

type InputTextProps = {
  name: string,
  disabled?: boolean,
  rules?: RegisterOptions,
  placeholder?: string,
  errorMessageMapping?: (error: FieldError) => string | undefined,
  dataTestid?: string,
  className?: string,
};

export default function InputText(
  {
    name,
    rules,
    disabled,
    className,
    errorMessageMapping,
    dataTestid,
    placeholder,
  }: Readonly<InputTextProps>,
) {
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });

  return (
    <TextFieldElement
      className={classNames(scss.formControl, scss.inputTextError, className)}
      name={name}
      variant="outlined"
      size="small"
      id={name}
      rules={rules}
      placeholder={placeholder}
      disabled={disabled ?? false}
      slotProps={{
        htmlInput: {
          'data-testid': dataTestid,
        },
      }}
      parseError={parseError}
    />
  );
}
