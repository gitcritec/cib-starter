import { CampsValue, FormField } from "@/types";
import FormInputErrorLabel from "./FormInputErrorLabel";

const FormSelect = ({ inputData, register, error }: { inputData: FormField; register: any; error: any }) => {
    const label = inputData.LABEL;
    const formItemIdString = String(inputData.FORM_ITEM_ID);
    return (
        label && (
            <>
                <label htmlFor={`${formItemIdString}`} className="block">
                    {label.replace("{c2r-url}", "url")}
                </label>
                <select
                    id={formItemIdString}
                    required={inputData.REQUIRED}
                    className="border border-black rounded p-2"
                    {...register(formItemIdString, {
                        required: inputData.REQUIRED ? "Required" : false,
                    })}
                >
                    {inputData.PLACEHOLDER && (
                        <option value={""} disabled selected>
                            {inputData.PLACEHOLDER}
                        </option>
                    )}
                    {inputData.CAMPS_VALUE &&
                        inputData.CAMPS_VALUE.map((value: CampsValue) => (
                            <option key={`${formItemIdString}_${value.VALUE}`} value={value.VALUE}>
                                {value.LABEL}
                            </option>
                        ))}
                </select>
                {error && <FormInputErrorLabel inputId={formItemIdString} message={error.message} />}
            </>
        )
    );
};

export default FormSelect;
