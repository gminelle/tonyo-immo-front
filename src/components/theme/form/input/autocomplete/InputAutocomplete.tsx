import useFormErrorParser from '@components/theme/form/hook/FormErrorParserHook';
import { SelectOptionProps } from '@components/theme/form/input/FormInputTypes';
import Loader from '@components/theme/loader/Loader';
import useMessages from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import { FormHelperText } from '@material-ui/core';
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Controller, ControllerRenderProps, FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import { FieldValues } from 'react-hook-form-mui';
import scss from '../form-input.module.scss';

type InputAutocompleteProps = {
  name: string,
  options: SelectOptionProps[],
  placeholder?: string,
  errorMessageMapping?: (error: FieldError) => string | undefined,
  rules?: RegisterOptions,
  dataTestId?: string,
  isLoading?: boolean,
  fitContent?: boolean,
};

export default function InputAutocomplete(
  {
    name,
    options,
    placeholder,
    errorMessageMapping,
    rules,
    dataTestId,
    isLoading,
    fitContent = false,
  }: Readonly<InputAutocompleteProps>,
) {
  const { control, formState: { errors } } = useFormContext();
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });
  const { messages } = useMessages();
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
          <MaterialAutocomplete
            data-testid={dataTestId}
            options={options}
            disablePortal
            size="small"
            forcePopupIcon={!isLoading}
            noOptionsText={isLoading ? messages.label.loading : ''}
            getOptionLabel={(option: SelectOptionProps) => option.label}
            isOptionEqualToValue={(option: SelectOptionProps, value: SelectOptionProps) => option.value === value.value}
            disableClearable
            // Store option.value in RHF while showing the option object to MUI Autocomplete
            value={options.find((o: SelectOptionProps) => o.value === field.value) ?? undefined}
            inputValue={inputValue}
            onInputChange={(
              _event: SyntheticEvent<Element, Event>,
              newInputValue: string,
              reason: AutocompleteInputChangeReason,
            ) => {
              // search for web browser completion
              if (reason === 'blur' || reason === 'reset') {
                const matchingOption: SelectOptionProps | undefined = options.find(
                  (option: SelectOptionProps) => option.label.toLowerCase() === newInputValue.toLowerCase(),
                );
                if (matchingOption) {
                  field.onChange(matchingOption.value);
                  setInputValue(matchingOption.label);
                }
              } else {
                setInputValue(newInputValue);
              }
            }}
            onChange={
              (_e: SyntheticEvent<Element, Event>, newOption: SelectOptionProps | null) => {
                field.onChange(newOption ? newOption.value : null);
                setInputValue(newOption ? newOption.label : '');
              }
            }
            onBlur={field.onBlur}
            slotProps={{
              listbox: {
                className: scss.autocompleteInputScrollingArea,
              },
            }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                placeholder={placeholder}
                className={classNames(scss.formControl, { [scss.formControlFitContent]: fitContent })}
                error={!!errors[name]}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      isLoading
                        ? <Loader small />
                        : params.InputProps.endAdornment
                    ),
                  },
                }}
              />
            )}
          />
        )}
      />
      {
        errors[name]
        && (
          <FormHelperText error className={scss.inputErrorHelperText}>
            {parseError(errors[name] as FieldError)}
          </FormHelperText>
        )
      }
    </div>
  );
}
