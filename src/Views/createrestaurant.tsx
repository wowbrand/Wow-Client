import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export interface IAppProps {}

export function Createrestaurant(props: IAppProps) {
  //UseStates

  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [selectedMultiFile, setSelectedMultiFile] = useState<Blob>();
  const [mainImagelink, setMainImageLink] = useState<string>("");
  // end of useStates

  const submitHandler = async (data: any, e: any) => {
    //REST API
    const formData = new FormData();
    if (selectedFile !== undefined) formData.append("file", selectedFile);
    formData.append("name", "name");
    console.log("formData", formData);
    console.log("selectedMultiFile", selectedMultiFile);

    await fetch("http://localhost:8080/img-upload/", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((resData) =>
        setMainImageLink(`mutation {createRestaurant(restaurantInput:{restaurantzip:"${
          data.restaurantcity
        }",restaurantname:"${data.restaurantname}",restaurantcity:"${
          data.restaurantcity
        }",restaurantstreet:"${data.restaurantstreet}",restaurantdescription:"${
          data.restaurantdescription
        }",restaurantstreetnumber:"${
          data.restaurantstreetnumber
        }",restaurantdescriptionshort:"${
          data.restaurantdescriptionshort
        }",restaurantMainImage:"${
          resData.message.split(`"location":"`).pop().split(`","etag`)[0]
        }"}){
  _id
}}
`)
      )
      .catch((err) => console.log(err));
    // END OF REST API

    console.log("selectedFile", mainImagelink);
    e.preventDefault();
    console.log(data.restaurantname);
    console.log(e);
    console.log("mainImageLink", mainImagelink);

    await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        query: mainImagelink,
      }),
    })
      .then((res) => res.json())
      .then((resData) => basicOutput(resData));
  };

  const basicOutput = (output: any) => {
    console.log("output", output);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any, e: any) => {
    console.log(data, e);
  };
  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler, onError)}>
        restaurantname
        <input {...register("restaurantname")} />
        <br />
        restaurantcity
        <input {...register("restaurantcity")} />
        <br />
        restaurantzip
        <input {...register("restaurantzip")} />
        <br />
        restaurantstreet
        <input {...register("restaurantstreet")} />
        <br />
        restaurantstreetnumber
        <input {...register("restaurantstreetnumber")} />
        <br />
        restaurantdescription
        <input {...register("restaurantdescription")} />
        <br />
        restaurantdescriptionshort
        <input {...register("restaurantdescriptionshort")} />
        <br />
        Main Picture:
        <input
          type="file"
          id="file-input"
          name="ImageStyle"
          content-type="multipart/form-data"
          onChange={(e) => {
            if (e.target.files !== null) setSelectedFile(e.target.files[0]);
          }}
        />
        <br />
        <input
          type="file"
          name="images"
          id="imgid"
          className="imgcls"
          onChange={(e) => {
            if (e.target.files !== null)
              setSelectedMultiFile(e.target.files[0]);
          }}
          multiple
        />
        <br />
        submit<button type="submit">Submit</button>
      </form>
    </div>
  );
}
