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
          <FormLabel className="text-[#e3e8ffe6]">{LabelName}</FormLabel>
          <FormControl>
            {inputType ? (
              <Input
                className={` text-white focus-visible:ring-0 ${
                  field.value.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border border-[#e3e8ffe6]"
                }`}
                type="text"
                placeholder="Enter your name here"
                {...field}
              />
            ) : (
              <Textarea
                className={`text-white focus-visible:ring-0 ${
                  field.value.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border border-[#e3e8ffe6]"
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
