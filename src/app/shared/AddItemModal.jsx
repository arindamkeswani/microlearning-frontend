import { FileInput, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { addTags, getTags } from "../../api/tags-fetchers";
import useIsClient from "../../api/hooks/useClient";
import { v4 as uuid } from "uuid";
import { addItems } from "../../api/fetcher/productFetcher";
import { getPresignedUrl, uploadFileToS3 } from "../../axios";
import Button from "../../lib/Button/Button";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "react-query";

const AddItemModal = ({ onClose, metaData }) => {
  //   const state = useSelector((state) => state.uploadReel);

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

    setTags((option) => [
      ...option,
      { value: res.data.data._id, label: value },
    ]);
  };

  const isClient = useIsClient();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tags, setTags] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const queryClient = useQueryClient();

  console.log(selectedFile);
  const handleSubmit = async () => {
    const key = `content/${uuid()}/${selectedFile.name}`;

    const obj = {
      name: name,
      description: desc,
      price: price,
      discount: discount,
      tags: tags.map((obj) => obj.value),
      urls: [key],
      type: metaData.key,
    };

    const uploadUrl = await getPresignedUrl({
      key,
      contentType: selectedFile.type,
    });

    const res = await uploadFileToS3(
      uploadUrl,
      selectedFile,
      selectedFile.type
    );

    const addedRes = await addItems({ payload: obj });

    if (addedRes) {
      onClose();
      toast.success("Courses added");
      queryClient.invalidateQueries([`get-${metaData.key}`]);
    }
  };
  return (
    <Modal show onClose={onClose} size="2xl" root={document.body}>
      <Modal.Header>
        <p className="text-base">Add {metaData.type}</p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex h-[30rem] overflow-auto w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold">Name</label>
              <TextInput
                className="w-full rounded-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold">Description</label>
              <Textarea
                className="w-full rounded"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-semibold">Price</label>
                <TextInput
                  className="w-full rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-semibold">Discount</label>
                <TextInput
                  className="w-full rounded"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <label className="text-sm font-semibold">Tags</label>
              <AsyncCreatableSelect
                isMulti
                defaultOptions
                onCreateOption={customCreateOption}
                className="w-full"
                loadOptions={promiseOptions}
                placeholder="Select"
                value={tags}
                onChange={(value) => setTags(value)}
                menuPortalTarget={isClient ? document.body : null}
                maxMenuHeight={200}
                menuPosition="fixed"
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
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 1000,
                  }),
                }}
              />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <label className="text-sm font-semibold">Upload image</label>
              <FileInput
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full gap-3">
          <Button className="bg-gray-700 rounded px-3">Cancel</Button>
          <Button
            className="bg-gray-700 rounded px-5"
            onClick={() => handleSubmit()}
          >
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
