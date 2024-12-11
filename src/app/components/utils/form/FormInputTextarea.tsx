import { FormField } from "@/types";
import FormInputErrorLabel from "./FormInputErrorLabel";

const FormInputTextarea = ({ inputData, register, error }: { inputData: FormField; register: any; error: any }) => {
    const label = inputData.LABEL;
    const formItemIdString = String(inputData.FORM_ITEM_ID);
    return (
        label && (
            
            <>
            
                <label htmlFor={`${formItemIdString}`} className="block">
                    {label}
                </label>
                <textarea
                    id={`${formItemIdString}`}
                    rows={inputData.ROWS}
                    placeholder={inputData.PLACEHOLDER && inputData.PLACEHOLDER}
                    required={inputData.REQUIRED}
                    className="border border-black rounded p-2"
                    {...register(formItemIdString, {
                        required: inputData.REQUIRED ? "Required" : false,
                        pattern:
                            inputData.TYPE === "email"
                                ? {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Please enter a valid email address",
                                }
                                : undefined,
                    })}
                ></textarea>
                {error && <FormInputErrorLabel inputId={formItemIdString} message={error.message} />}
            </>
        )
    );
};

export default FormInputTextarea;
