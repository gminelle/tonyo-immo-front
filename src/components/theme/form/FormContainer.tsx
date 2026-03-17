import { FormEventHandler, FormHTMLAttributes, PropsWithChildren } from 'react';
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FieldValues, FormContainer as MuiFormContainer } from 'react-hook-form-mui';

export type FormContainerProps<TFieldValues extends FieldValues = FieldValues> = PropsWithChildren<{
  onSuccess?: SubmitHandler<TFieldValues>,
  onError?: SubmitErrorHandler<TFieldValues>,
  FormProps?: FormHTMLAttributes<HTMLFormElement>,
  handleSubmit?: FormEventHandler<HTMLFormElement>,
  formContext: UseFormReturn<TFieldValues>,
  className?: string,
}>;

function FormContainer<TFieldValues extends FieldValues = FieldValues>(
  {
    handleSubmit,
    children,
    FormProps,
    formContext,
    onSuccess,
    onError,
    className,
  }: FormContainerProps<TFieldValues>,
) {
  const mergedFormProps: typeof FormProps = {
    ...FormProps,
    className: className,
  };

  return (
    <MuiFormContainer<TFieldValues>
      formContext={formContext}
      onSuccess={onSuccess}
      onError={onError}
      FormProps={mergedFormProps}
      handleSubmit={handleSubmit}
    >
      {children}
    </MuiFormContainer>
  );
}

export default FormContainer;
