import { useDropzone } from "react-dropzone";
import { Fragment, useEffect, useState } from "react";
import awsExports from "../aws-exports";

const DropZone = ({
  className,
  title,
  subTitle,
  subTitleStyle,
  titleStyle,
  icon,
  onUpload,
}) => {
  const [dropZoneFile, setDropZoneFile] = useState([]);
  const [uploadedFile, setUploadedFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setDropZoneFile,
    accept: "image/*",
    noKeyboard: true,
    noClick: false,
    multiple: false,
  });

  useEffect(() => {
    dropZoneFile.map((file) => {
      let fileData = {
        title: "",
        file: {
          ext: getFileExt(file.name),
          name: getFileName(file.name),
          key: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
          level: "public",
          obj: file,
        },
      };
      setUploadedFile(fileData);
      onUpload(fileData);
      return false;
    });

    // eslint-disable-next-line
  }, [dropZoneFile]);

  const getFileExt = (fileName) => {
    return fileName.substring(fileName.lastIndexOf(".") + 1);
  };

  const getFileName = (fileName) => {
    return fileName.replace("." + getFileExt(fileName), "");
  };

  return (
    <div
      {...getRootProps({
        className: `dropzone cursor-pointer flex flex-col justify-center items-center rounded-square bg-caak-liquidnitrogen ${
          className && className
        }`,
      })}
    >
      {uploadedFile ? (
        <Fragment>
          <span>Сонгогдсон зураг:</span>
          <input {...getInputProps()} />
          <img
            className={"max-h-full"}
            alt={uploadedFile.file.name}
            src={uploadedFile.file.url}
          />
          <span>Дахин сонгох</span>
        </Fragment>
      ) : (
        <Fragment>
          <h3>Drop File</h3>
          <input {...getInputProps()} />
          {icon && icon}
          <span className={`${titleStyle}`}>{title}</span>
          <span className={`${subTitleStyle}`}>{subTitle}</span>
        </Fragment>
      )}
    </div>
  );
};

export default DropZone;
