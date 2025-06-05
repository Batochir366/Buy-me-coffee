import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const Field = ({
  control,
  name,
  LabelName,
  inputType,
}: {
  control: any;
  name: string;
  LabelName: string;
  inputType?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-col flex items-start w-full">
          <FormLabel>{LabelName}</FormLabel>
          <FormControl>
            {inputType ? (
              <Input
                className={` focus-visible:ring-0 ${
                  field?.value?.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border-2"
                }`}
                type="text"
                placeholder="Enter your name here"
                {...field}
              />
            ) : (
              <Textarea
                className={` focus-visible:ring-0 ${
                  field?.value?.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border-2"
                }`}
                placeholder="Enter your name here"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
