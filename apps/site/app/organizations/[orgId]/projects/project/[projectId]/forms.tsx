import { DomainFragmentFragment } from "@ticketApp/codegen";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { sdk } from "../../../../../../utils/sdk";

const dropUnchangedKeys = (
  initialValues: DomainFragmentFragment,
  data: DomainFragmentFragment
) => {
  const result = {};
  Object.keys(data).forEach(key => {
    if (initialValues[key] !== data[key]) {
      result[key] = data[key];
    }
  });
  return result;
};

export const UpdateForm: FC<{
  initialValues: DomainFragmentFragment;
  onSuccess: () => void;
  onCanceled: () => void;
}> = ({ initialValues, onCanceled, onSuccess }) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainFragmentFragment>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: DomainFragmentFragment) => {
    setIsLoading(true);

    sdk.UpdateDomain({
      input: {
        id: initialValues.id,
        patch: dropUnchangedKeys(initialValues, data),
      },
    });

    setIsLoading(false);

    startTransition(() => {
      onSuccess();
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={(isLoading || isPending) && "opacity-40"}
    >
      <label
        htmlFor="name"
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        name
        <input
          type="text"
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="name"
          {...register("name", {
            required: "This field is damn required",
          })}
        />
        {errors.name && <span>errors.name</span>}
      </label>{" "}
      <label
        htmlFor="shortName"
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        shortName
        <input
          type="text"
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="shortName"
          {...register("shortName", {
            required: "This field is damn required",
            maxLength: { value: 10, message: "Max length is 10" },
          })}
        />
        {errors.shortName && <span>errors.shortName</span>}
      </label>
      <label
        htmlFor="color"
        className="flex flex-col px-4 py-2 mt-2 text-xs border-l-4 rounded text-slate-500 bg-slate-800"
        style={{ borderColor: initialValues?.color }}
      >
        Color
        <input
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          type="color"
          id="color"
          {...register("color", { required: true })}
        />
        {errors?.color && <span>This field is required</span>}
      </label>
      <label
        htmlFor="description "
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        Description
        <textarea
          rows={3}
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>This field is required</span>}
      </label>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700"
        >
          {isLoading || isPending ? (
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : null}
          save
        </button>

        <button className="px-4 py-2 text-teal-700 bg-white border-2 border-teal-500 rounded hover:bg-teal-200">
          cancel
        </button>
        <button
          className="font-bold underline text-teal-50"
          onClick={() => {
            setIsLoading(true);
            window.confirm(
              `Are you sure you want to delete ${initialValues.name}?`
            ) && sdk.DeleteDomain({ input: { id: initialValues.id } });
            setIsLoading(false);
            startTransition(() => {
              onSuccess();
              router.refresh();
            });
          }}
        >
          delete
        </button>
      </div>
    </form>
  );
};

export const CreateForm: FC<{
  projectId: string;
  onSuccess: () => void;
  onCanceled: () => void;
}> = ({ projectId, onCanceled, onSuccess }) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainFragmentFragment>();

  const onSubmit = (data: DomainFragmentFragment) => {
    setIsLoading(true);

    sdk.CreateDomain({
      input: {
        domain: {
          projectId,
          name: data.name,
          shortName: data.shortName,
          description: data.description,
          color: data.color,
        },
      },
    });

    setIsLoading(false);

    startTransition(() => {
      onSuccess();
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={(isLoading || isPending) && "opacity-40 " + "form-grid"}
    >
      <label
        htmlFor="name"
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        name
        <input
          type="text"
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="name"
          {...register("name", { required: "This field is damn required" })}
        />
        {errors.name && <span>errors.name</span>}
      </label>
      <label
        htmlFor="shortName"
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        shortName
        <input
          type="text"
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="shortName"
          {...register("shortName", {
            required: "This field is damn required",
            maxLength: { value: 10, message: "Max length is 10" },
          })}
        />
        {errors.shortName && <span>errors.shortName</span>}
      </label>
      <label
        htmlFor="color"
        className="flex flex-col px-4 py-2 mt-2 text-xs border-l-4 rounded text-slate-500 bg-slate-800"
        style={{ borderColor: "#000000" }}
      >
        Color
        <input
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          type="color"
          id="color"
          {...register("color", { required: true })}
        />
        {errors?.color && <span>This field is required</span>}
      </label>
      <label
        htmlFor="description "
        className="flex flex-col px-4 py-2 mt-2 text-xs rounded text-slate-500 bg-slate-800"
      >
        Description
        <textarea
          rows={3}
          className="p-0 mt-1 font-mono text-xs text-white bg-transparent border-none outline-none resize-none ring-0 "
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>This field is required</span>}
      </label>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700"
        >
          {isLoading || isPending ? (
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : null}
          save
        </button>
        <button
          className="px-4 py-2 text-teal-700 bg-white border-2 border-teal-500 rounded hover:bg-teal-200"
          onClick={onCanceled}
        >
          cancel
        </button>
      </div>
    </form>
  );
};
