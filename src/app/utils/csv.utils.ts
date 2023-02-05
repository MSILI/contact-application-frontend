export class CsvHelper{
  static downloadCSV(csvData: any) {
    const localBlob = new Blob([csvData], {type: "text/csv"});
    const url = window.URL.createObjectURL(localBlob);
    let downloadLink = document.createElement("a");
    let isSafariBrowser = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      downloadLink.setAttribute("target", "_blank");
    }
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", "contacts.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
