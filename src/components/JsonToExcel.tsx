import React, { useState } from "react";
import {
  UploadOutlined,
  LoadingOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Upload, Steps, Alert } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import "antd/dist/antd.css";
import axios from "axios";
import * as XLSX from "xlsx";
import Marquee from "react-fast-marquee";
import download from "downloadjs";

const { Step } = Steps;

const JsonToExcel: React.FC = () => {
  message.config({
    duration: 4,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  function saveFile(url: string, filename = null) {
    const link: any = document.createElement("a");
    link.style = "display: none";
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      console.log(file, "FİLE");
      formData.append("dosya1", file as RcFile);
    });
    setUploading(true);
    try {
      const basicAuthCredentials = btoa(
        process.env.USER + ":" + process.env.PASSWORD
      );
      const { data, status } = await axios({
        url: process.env.URL2,
        method: "POST",
        headers: { Authorization: "Basic " + basicAuthCredentials },
        data: formData,
        responseType: "blob", // important
      });
      if (data) {
        const isError = saveFile(data.url);
        console.log(isError);
      }
      message.success("Dosya başarılı bir şekilde indirildi.");
      setFileList([]);
    } catch (error) {
      message.error(
        "Beklenmedik bir hata ile karşılaştık. Anlayışınız için teşekkürler."
      );
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log("before upload file", file);
      if (file.name.split(".").pop() == "json") {
        setFileList([...fileList, file]);
      } else {
        message.error("Sadece json dosyası çevirebilirsiniz !");
        setFileList([]);
        return false;
      }
    },
    fileList,
  };
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  return (
    <>
      <div className="container">
        {uploading && fileList.length > Number(0) && (
          <div className="container">
            <Steps>
              <Step
                status="finish"
                title="Dosya Seçin"
                icon={<UserOutlined />}
              />

              <Step
                status="process"
                title="Yükleniyor"
                icon={<LoadingOutlined />}
              />

              <Step
                status="wait"
                title="Başarıyla Çevirildi"
                icon={<SmileOutlined />}
              />
            </Steps>
          </div>
        )}
        <div className="d-flex flex-column align-items-center py-5">
          <h2>JSON -EXCEL Dönüştürücü</h2>
          <small>
            JSON Dosyanızı Çevrimiçi Olarak Ücretsiz Olarak Excel'e Dönüştürün.
          </small>
          <div>
            <small>
              Powered by{" "}
              <a href="https://profile.omerleyazilim.com">Ömer Asım Çiriğ</a>
            </small>
          </div>
          <Alert
            message="Lütfen Koşulları okuyarak işlem yapınız ..."
            description="Max 5Mb || File type only JSON"
            type="info"
            closable
            showIcon
            onClose={onClose}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center h-100">
          <div>
            <Upload {...props}>
              <Button
                className="mx-2"
                style={{ width: "35vw" }}
                icon={<UploadOutlined />}
              >
                Dosya Seç
              </Button>
            </Upload>
          </div>
          <Button
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={
              fileList.length > 0
                ? { marginTop: `-30px`, background: "#8c8c8c", color: "white" }
                : { marginBottom: `0px` }
            }
          >
            {uploading ? "Yükleniyor ..." : "Dönüştür"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default JsonToExcel;
