console.log("Content script injected");
const today = new Date();
const expire = new Date('2022-9-20')
today.setHours(0, 0, 0, 0);
if (expire > today) {
setTimeout(function() {
if (document.readyState !== 'loading') {
        var info = document.getElementById("divSectionDDL").getElementsByTagName("option");
        var divWrapper = document.createElement("div");
       var schoolName = document.getElementById("ctl00_MainContent_ctl00_ctl00_HyperLinkInstitution").innerHTML;
       if (schoolName != null) {
        schoolName = " (" + schoolName + ")";
       } else {
        schoolName = ''
       }
       tblHdr = 'Unofficial Classes for <span contenteditable="true">' + document.getElementsByTagName("h2")[0].innerHTML.split(", ")[1] + "</span> " + schoolName;
        var table = document.createElement("table");
            table.classList = 'tbl-itm tbl-frm-itm';
            table.id = "tbl-fill";
        var tbl_lbls = [tblHdr, "Class Name","Block","Teacher", "Semester"];
        for (var i=0; i < tbl_lbls.length; i++) {
            var td = document.createElement("td");
                td.innerHTML = tbl_lbls[i];
                td.classList = 'tbl-itm hdr-itm';
                if (i == 0) {
                    td.setAttribute("colspan","4")
                    tr = document.createElement("tr")
                    table.appendChild(tr);
                    tr.appendChild(td)
                    continue
                } else if (i == 1) {
                    var tr2 = document.createElement("tr");
                    table.appendChild(tr2);
                }
                tr2.appendChild(td);
        }
        var blockList = []
        var allClassData = {}
            for (var i = 0; i < info.length; i++) {
                var classData = {}, curClass = info[i].innerHTML.split(' ')
                curClass.shift(); 
                curClass.reverse(); 
                curClass.splice(1,1);
                classData.teacherName = curClass[0];
                classData.block = curClass[1];
                if (classData.block.includes("(A-B)") && classData.block.includes("5") != true) {
                    classData.semester = "S1"
                    for (var x = 0; x < blockList.length; x++) {
                        if (blockList[x] == classData.block + "S1") {
                            classData.semester = "S2"; 
                            break
                        }
                    }
                } else {
                    classData.semester = "-"
                    if (classData.block.includes("5") == true) {
                        classData.block = "HR"
                    }
                } 
                curClass.splice(0,2); curClass.reverse(); classData.name = curClass.join(" ")
                x = []
                if (classData.semester == "-") {
                        allClassData[classData.block] = classData;
                        blockList.push(classData.block)
                    }
                else {
                    allClassData[classData.block + classData.semester] = classData;
                    blockList.push(classData.block + classData.semester)
                }
            }
            blockList.sort();
            var tblAs = ["name","block","teacherName","semester"]
            for (var i = 0; i < blockList.length; i++) {
                var tr = document.createElement("tr")
                for (var z = 0; z < tblAs.length; z++) {
                    var td = document.createElement("td")
                        td.innerHTML = allClassData[blockList[i]][tblAs[z]]
                        tr.appendChild(td)
                }
                table.appendChild(tr)
            }
            var td = document.createElement("td")
                td.innerHTML = '<i>Classes are unofficial and are subject to change at any time. Semester data may be inaccurate.<br>This tool is not affiliated with the school. These may not be your final enrollments.</i>'
                td.className = 'tbl-itm'
                td.setAttribute("colspan","4")
                table.appendChild(td)
            document.getElementsByClassName("ng-scope")[6].style.minHeight = "auto";
            document.getElementsByClassName("ng-scope")[6].style.height = "auto";
            document.getElementsByClassName("ng-scope")[9].style.display = "none";
            well = document.getElementsByClassName("well")[0].parentElement.parentElement;
            well.innerHTML = '';
            well.appendChild(table);
            setTimeout(function() {
            var initWd = window.innerWidth;
            var initHt = window.innerHeight;
            window.resizeTo(initWd - 100, initHt - 100);
            window.resizeTo(initWd, initHt);
            },500)
        };
},5000);
}