"use client";

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import FormInputRadio from "../utils/form/FormInputRadio";
import FormInputRegular from "../utils/form/FormInputRegular";
import FormSelect from "../utils/form/FormInputSelect";
import FormInputTextarea from "../utils/form/FormInputTextarea";
import FormSubmitMessage from "../utils/form/FormSubmitMessage";

import { FormField, SectionDataObject, SendFormData } from "@/types";
import { useTranslate } from "@/utils/TranslateContext";
import { filterTranslateSystem } from "@/utils/crico";

const FormBuilder = ({ sectionData }: SectionDataObject) => {
  
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [serverMessage, setServerMessage] = useState({ message: "", status: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  
  const { translate } = useTranslate();
  // const translateArray = JSON.parse(translate); // Transforma a string JSON em um array
  console.log(filterTranslateSystem(translate, 'recaptcha-fail'));

  if (!sectionData || !sectionData.FORM) {
    // Renderize algo diferente ou retorne null se não houver dados
    return <div>No form data available.</div>;
  }
  const onSubmit = async (data: SendFormData) => {
    let activeRecaptcha = false;
    let recaptchaValue = '';

    if (recaptchaRef.current) {
      activeRecaptcha = true;
      recaptchaValue = recaptchaRef.current.getValue() || '';
    }
    if (activeRecaptcha) {
      if (!recaptchaValue) {
        const translatedMessage = filterTranslateSystem(translate, 'recaptcha-fail');
        setServerMessage({ message: translatedMessage, status: false });
        return;
      }
    }



    data.recaptchaToken = recaptchaValue; // Inclui o token do reCAPTCHA nos dados enviados

    setIsSubmitting(true);
    if (!sectionData || !sectionData.FORM) {
      // Renderize algo diferente ou retorne null se não houver dados
      return <div>No form data available.</div>;
    }
    const orderedData = sectionData.FORM.FORM_FIELDS
      .map((formField) => {
        const fieldId = String(formField.FORM_ITEM_ID); // Converte o ID para string
        const fieldValue = data[fieldId];

        // Retorna um objeto de chave única se o valor for válido
        return fieldValue !== undefined && fieldValue !== ""
          ? { [fieldId]: fieldValue }
          : null;
      })
      .filter(Boolean); // Remove objetos nulos

    // Constrói o JSON manualmente para garantir que as chaves numéricas estejam entre aspas
    const jsonBody = `[${orderedData.map(item => {
      if (!item) return ""; // Pula itens nulos
      const key = Object.keys(item)[0]; // Extrai a chave do objeto
      const value = item[key]; // Extrai o valor do objeto
      return `{ "${key}": ${JSON.stringify(value)} }`; // Força a chave numérica para string com aspas
    }).filter(Boolean).join(', ')}]`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formBuilder/${sectionData.FORM.FORM_ID}/${sectionData.LANGUAGE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonBody, // Envia o JSON manualmente formatado
        }
      );


      const result = await response.json();

      if (response.ok) {
        setServerMessage({ message: result.message, status: true });
        setTimeout(() => {
          setServerMessage({ message: "", status: false });
          reset();
          if (activeRecaptcha && recaptchaRef.current) {
            recaptchaRef.current.reset(); // Agora está seguro chamar reset()
          }
        }, 2500);
      } else {
        setServerMessage({ message: result.message || "Form submission failed.", status: false });
      }

    } catch (error) {
      console.error(error); // Exibe o erro no console para depuração
      setServerMessage({ message: "An error occurred while submitting the form.", status: false });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`${(isSubmitting) && "opacity-50"} ${sectionData.FORM.CLASSES ? sectionData.FORM.CLASSES : ""
            } `}
    >
      {sectionData.FORM.FORM_FIELDS.map((formField: FormField) => (
        <div
          key={formField.FORM_ITEM_ID}
          className={`formBuild-input ${formField.CUSTOM_CLASS ? formField.CUSTOM_CLASS : ""
            } relative mb-6`}
        >
          {formField.CAMP === "input" ? (
            // INPUT TYPE RADIO
            formField.TYPE === "radio" ? (
              <FormInputRadio
                inputData={formField}
                register={register}
                error={errors[formField.FORM_ITEM_ID]}
                initialValue={getValues([`${formField.FORM_ITEM_ID}`])}
              />
            ) : (
              // REGULAR INPUT
              <FormInputRegular
                inputData={formField}
                register={register}
                error={errors[formField.FORM_ITEM_ID]}
              />
            )
          ) : // INPUT TYPE SELECT
            formField.CAMP === "select" ? (
              <>{formField.TYPE}
              <FormSelect inputData={formField} register={register} error={errors[formField.FORM_ITEM_ID]} /></>
            ) : // INPUT RECAPTCHA
              formField.CAMP === "textarea" ? (
                
                <FormInputTextarea
                  inputData={formField}
                  register={register}
                  error={errors[formField.FORM_ITEM_ID]}
                />
              ) : formField.CAMP === "recaptcha" ? (
                  formField.WEB_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={formField.WEB_KEY}
                      onChange={() => setServerMessage({ message: "", status: false })}
                    />
                  ) : (
                    <p>Chave do reCAPTCHA não configurada.</p> // Mensagem de erro ou fallback
                  )
              ) : (
                <></>
              )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-red-400 px-3 py-2 font-bold text-md rounded-sm text-white hover:bg-red-600 uppercase"
      >
        {isSubmitting ? 'Loading' : sectionData.FORM.BUTTON}
      </button>

      {serverMessage.message && (
        <FormSubmitMessage
          formId={sectionData.FORM.FORM_ID}
          message={serverMessage.message}
          status={serverMessage.status}
        />
      )}
    </form>
  );
};

export default FormBuilder;