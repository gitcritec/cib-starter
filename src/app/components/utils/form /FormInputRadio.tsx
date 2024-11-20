import { CampsValue, FormField } from "@/types";
import FormInputErrorLabel from "./FormInputErrorLabel";

const FormInputRadio = ({
    inputData,
    register,
    initialValue,
    error,
}: {
    inputData: FormField;
    register: any;
    initialValue: any;
    error: any;
}) => {
    const label = inputData.LABEL;
    const formItemIdString = String(inputData.FORM_ITEM_ID);
    return (
        label && (
            <fieldset>
                <legend className="block font-bold">{label}</legend>

                <div id={formItemIdString} className="flex items-center gap-4">
                    {inputData.CAMPS_VALUE?.map((value: CampsValue, index: number) => (
                        <div key={value.CAMPS_VALUES_ID} className="flex items-center gap-2">
                            <input
                                type="radio"
                                id={`${formItemIdString}_${value.VALUE}`}
                                value={value.VALUE}
                                {...register(formItemIdString, {
                                    required: inputData.REQUIRED ? "Required" : false,
                                })}
                                required={inputData.REQUIRED}
                                checked={!initialValue[0] ? index === 0 : initialValue[0] === value.VALUE}
                            ></input>
                            <label htmlFor={`${formItemIdString}_${value.VALUE}`}>{value.LABEL}</label>
                        </div>
                    ))}
                </div>
                {error && <FormInputErrorLabel inputId={formItemIdString} message={error.message} />}
            </fieldset>
        )
    );
};

export default FormInputRadio;
