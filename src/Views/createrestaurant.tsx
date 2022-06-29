import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export interface IAppProps {}

export function Createrestaurant(props: IAppProps) {
  //UseStates

  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [selectedMultiFile, setSelectedMultiFile] = useState<Blob>();
  const [mainRestaurantData, setmainRestaurantData] = useState<string>("");
  // end of useStates
  const [uploadedPicOne, setUploadedPicOne] = useState<string>("https://restaurant-olympiasee.de/files/restaurant-olympiasee/galerie/Seerestaurant_AO_05klein.jpg")
  const [uploadedPicTwo, setUploadedPicTwo] = useState<string>("https://restaurant-olympiasee.de/files/restaurant-olympiasee/galerie/Seerestaurant_AO_05klein.jpg")
  const uploadPic = async () => {
    const formData = new FormData();
    if (selectedFile !== undefined) formData.append("files", selectedFile);
    if (selectedMultiFile !== undefined)
      formData.append("files", selectedMultiFile);
    formData.append("name", "name");
    console.log("formData", formData);
    console.log("selectedMultiFile", selectedMultiFile);

    try {
      const res = await fetch("http://localhost:8080/img-upload/", {
        method: "PUT",
        body: formData,
      })
      const resData = await res.json()
      console.log('resData :>> ', resData);
      JSON.parse(resData.message)[0] !== undefined &&
        setUploadedPicOne(JSON.parse(resData.message)[0].location)
      JSON.parse(resData.message)[1] !== undefined && setUploadedPicTwo(JSON.parse(resData.message)[1].location)
    } catch (err) {
      console.log('err', err)
    }
  }



  const submitHandler = async (data: any, e: any) => {
    e.preventDefault();
    //REST API

    try {
        const mutation = `mutation {createRestaurant(restaurantInput:{restaurantzip:"${
          data.restaurantcity
        }",restaurantname:"${data.restaurantname}",restaurantcity:"${
          data.restaurantcity
        }",restaurantstreet:"${data.restaurantstreet}",restaurantdescription:"${
          data.restaurantdescription
        }",restaurantstreetnumber:"${
          data.restaurantstreetnumber
        }",restaurantdescriptionshort:"${
          data.restaurantdescriptionshort
          }",restaurantMainImage:"${uploadedPicOne
        }",restaurantImage2:"${uploadedPicTwo}"}){
          _id
        }}
        `



      // END OF REST API
    //
    console.log('mutation', mutation)

    await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        query: mutation,
      }),
    })
      .then((res) => res.json())
      .then((resData) => basicOutput(resData)).catch(err => console.log('err', err))
    } catch (err) {
      console.log('err :>> ', err);
    }





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

        <br />
        submit<button type="submit">Submit</button>
      </form>

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
          content-type="multipart/form-data"
          onChange={(e) => {
            if (e.target.files !== null)
              setSelectedMultiFile(e.target.files[0]);
          }}
          // multiple
        />


          <button onClick={uploadPic}>Upload pictures</button>

    </div>
  );
}

// Notes for multiple file upload, as for now upload only works with 2 3 or 4 files, more is rejected, less than 2 will give an error because of receiving an array, we can ofcourse only allow multiple files to upload by making them mandetory, only file 1 and to 2are implemented on front end, backend is ready to receive 4 files, names will need to be restaurantImage3 and restaurantImage4
