import React, { useEffect, useRef, useState } from "react";
import Select from "../../../lib/Select/Select";
import { TextInput, Textarea } from "flowbite-react";
import AsyncSelect from "react-select/async-creatable";
import { addTags, getTags } from "../../../api/tags-fetchers";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../slices/uploadReelsSlice";

const OtherInformationForm = () => {
  const state = useSelector((state) => state.uploadReel);
  const promiseOptions = async (value) => {
    if (value) {
      const res = await getTags({ q: value });

      const returnRes = res.map(({ name, _id }) => ({
        label: name,
        value: _id,
      }));
      return returnRes;
    }
    return [];
  };

  const customCreateOption = async (value) => {
    const res = await addTags({ payload: { name: value } });

    const newOptions = [
      ...(state.tags || []),
      { value: res.data.data._id, label: value },
    ];
    // setselectedTags(newOptions);

    dispatch(
      updateState({
        ...state,
        tags: newOptions,
      })
    );
  };

  const dispatch = useDispatch();

  return (
    <div className="p-3 h-96 overflow-auto overflow-y-auto py-12">
      <div className="flex flex-col gap-10">
        <div className="gap-2 grid grid-cols-12 items-center w-full">
          <label className="col-span-1 text-sm">Captions</label>
          <Textarea
            className="w-full rounded col-span-11"
            rows={2}
            value={state.caption || ""}
            onChange={(e) => {
              dispatch(
                updateState({
                  ...state,
                  caption: e.target.value,
                })
              );
            }}
          />
        </div>

        <div className="grid grid-cols-12 gap-2 items-center">
          <label className="col-span-1 text-sm">Tags</label>
          <AsyncSelect
            isMulti
            defaultOptions
            onCreateOption={customCreateOption}
            className="col-span-11"
            loadOptions={promiseOptions}
            value={state.tags || []}
            onChange={(value) => {
              //   setselectedTags(value);
              dispatch(
                updateState({
                  ...state,
                  tags: value,
                })
              );
            }}
            styles={{
              valueContainer: (base) => ({
                ...base,
                height: "48px",
                overflowY: "scroll",
                padding: "10px",
              }),
              input: (base) => ({
                ...base,
                border: "none",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherInformationForm;
