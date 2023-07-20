import { useState } from "react";
import { Combobox } from "@headlessui/react";

export default function SearchBar({ value, setValue, onChange, filteredData }) {
  return (
    <Combobox value={value} onChange={setValue}>
      <Combobox.Input onChange={onChange} />
      <Combobox.Options>
        {filteredData.map((item) => (
          <Combobox.Option key={item._id} value={item}>
            {`${item.course_id}: ${item.course_title}`}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
