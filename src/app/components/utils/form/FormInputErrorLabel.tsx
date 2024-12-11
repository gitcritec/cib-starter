const FormInputErrorLabel = ({ inputId, message }: { inputId: number | string; message: string }) => {
    return (
        <label htmlFor={`${inputId}`} className="absolute -bottom-5 left-0 text-red-500 text-xs">
            {message}
        </label>
    );
};

export default FormInputErrorLabel;