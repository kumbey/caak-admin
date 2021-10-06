import { useDropzone } from "react-dropzone";
import { Fragment, useEffect, useState } from "react";
import awsExports from "../aws-exports";
import { getFileUrl } from "../utility/Util";

const DropZone = ({
  className,
  title,
  subTitle,
  subTitleStyle,
  titleStyle,
  icon,
  file,
  setFile,
  keyName,
}) => {
  const [dropZoneFile, setDropZoneFile] = useState([]);
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
        ext: getFileExt(file.name),
        name: getFileName(file.name),
        key: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        level: "public",
        obj: file,
      };
      setFile(keyName, fileData);
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
      {file ? (
        <Fragment>
          <h3>Drop File</h3>
          <input {...getInputProps()} />
          <img
            className={"max-h-full rounded-md"}
            alt={file.name}
            src={getFileUrl(file)}
          />
          <span>{"Дахин сонгох"}</span>
        </Fragment>
      ) : (
        <Fragment>
          <h3>Drop File</h3>
          <input {...getInputProps()} />
          {icon && icon}
          <img className={"max-h-full rounded-md"} alt={""} src={""} />
          <span className={`${titleStyle}`}>{title}</span>
          <span className={`${subTitleStyle}`}>{subTitle}</span>
        </Fragment>
      )}
    </div>
  );
};

export default DropZone;
