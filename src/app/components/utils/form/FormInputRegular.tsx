import { FormField } from "@/types";
import FormInputErrorLabel from "./FormInputErrorLabel";
import { UseFormRegister, FieldError, FieldValues, Merge, FieldErrorsImpl } from "react-hook-form";


interface FormInputRegularProps {
    inputData: FormField;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const FormInputRegular = ({ inputData, register, error }: FormInputRegularProps) => {
    const label = inputData.LABEL;
    const formItemIdString = String(inputData.FORM_ITEM_ID);

    return (
        label && (
            <div className={`formBuild-input ${inputData.CUSTOM_CLASS || ""} relative mb-6`}>
                <label htmlFor={formItemIdString} className="block">
                    {label + (inputData.REQUIRED ? "*" : "")}
                </label>

                <input
                    id={formItemIdString}
                    type={inputData.TYPE}
                    className="border border-black rounded p-2"
                    {...register(formItemIdString, {
                        required: inputData.REQUIRED ? { value: true, message: "This field is required" } : false,
                        pattern: inputData.TYPE === "email" ? {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Please enter a valid email address"
                        } : undefined,
                    })}
                />

                {error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && (
                    <FormInputErrorLabel inputId={formItemIdString} message={error.message} />
                )}

            </div>
        )
    );
};

export default FormInputRegular;
