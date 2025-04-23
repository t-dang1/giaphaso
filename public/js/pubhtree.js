var lineStyle = "curve";
var datajson = `{
    "result": {
        "success": true,
        "errorCode": 0
    },
    "object": {
        "personId": 26529,
        "motherId": null,
        "parentId": null,
        "fatherId": null,
        "fullName": "Đặng",
        "email": null,
        "address": "",
        "avatar": "",
        "isDied": true,
        "gender": "Nam",
        "namSinh": "",
        "namMat": "",
        "nsnm": "?",
        "biography": "",
        "nickname": "",
        "personKey": "dang",
        "orderSort": 1,
        "generationOrder": 1,
        "isHidden": false,
        "father": null,
        "mother": null,
        "children": [
            {
                "personId": 26532,
                "motherId": 26531,
                "parentId": null,
                "fatherId": 26529,
                "fullName": "Đặng2",
                "email": null,
                "address": "",
                "avatar": "",
                "isDied": false,
                "gender": "Nam",
                "namSinh": "",
                "namMat": "",
                "nsnm": "?",
                "biography": "",
                "nickname": "",
                "personKey": "dang2",
                "orderSort": 1,
                "generationOrder": 2,
                "isHidden": false,
                "father": null,
                "mother": null,
                "children": [
                    {
                        "personId": 26594,
                        "motherId": 26593,
                        "parentId": null,
                        "fatherId": 26532,
                        "fullName": "111111",
                        "email": null,
                        "address": "",
                        "avatar": "",
                        "isDied": false,
                        "gender": "Nam",
                        "namSinh": "",
                        "namMat": "",
                        "nsnm": "?",
                        "biography": "",
                        "nickname": "",
                        "personKey": "111111",
                        "orderSort": 1,
                        "generationOrder": 3,
                        "isHidden": false,
                        "father": null,
                        "mother": null,
                        "children": [],
                        "spouses": [],
                        "spouse": null
                    }
                ],
                "spouses": [
                    {
                        "personId": 26593,
                        "motherId": null,
                        "parentId": null,
                        "fatherId": null,
                        "fullName": "22222",
                        "email": null,
                        "address": "",
                        "avatar": "",
                        "isDied": false,
                        "gender": "Nữ",
                        "namSinh": "",
                        "namMat": "",
                        "nsnm": "?",
                        "biography": "",
                        "nickname": "",
                        "personKey": "22222",
                        "orderSort": 1,
                        "generationOrder": 2,
                        "isHidden": false,
                        "father": null,
                        "mother": null,
                        "children": null,
                        "spouses": null,
                        "spouse": null
                    }
                ],
                "spouse": null
            },
            {
                "personId": 26595,
                "motherId": 26531,
                "parentId": null,
                "fatherId": 26529,
                "fullName": "22222222",
                "email": null,
                "address": "",
                "avatar": "",
                "isDied": false,
                "gender": "Nam",
                "namSinh": "",
                "namMat": "",
                "nsnm": "?",
                "biography": "",
                "nickname": "",
                "personKey": "22222222",
                "orderSort": 1,
                "generationOrder": 2,
                "isHidden": false,
                "father": null,
                "mother": null,
                "children": [],
                "spouses": [],
                "spouse": null
            },
            {
                "personId": 26596,
                "motherId": 26531,
                "parentId": null,
                "fatherId": 26529,
                "fullName": "44444444",
                "email": null,
                "address": "",
                "avatar": "",
                "isDied": false,
                "gender": "Nam",
                "namSinh": "",
                "namMat": "",
                "nsnm": "?",
                "biography": "",
                "nickname": "",
                "personKey": "44444444",
                "orderSort": 1,
                "generationOrder": 2,
                "isHidden": false,
                "father": null,
                "mother": null,
                "children": [],
                "spouses": [],
                "spouse": null
            }
        ],
        "spouses": [
            {
                "personId": 26531,
                "motherId": null,
                "parentId": null,
                "fatherId": null,
                "fullName": "BÀ",
                "email": null,
                "address": "",
                "avatar": "",
                "isDied": false,
                "gender": "Nữ",
                "namSinh": "",
                "namMat": "",
                "nsnm": "?",
                "biography": "",
                "nickname": "",
                "personKey": "ba",
                "orderSort": 1,
                "generationOrder": 1,
                "isHidden": false,
                "father": null,
                "mother": null,
                "children": null,
                "spouses": null,
                "spouse": null
            }
        ],
        "spouse": null
    }
}`
var treeData = null;
var rootId = ""; //Khởi tạo rootId
var selectedDeep = ""; //Chọn giới hạn hiển thị thế hệ
var baseSvg, svgGroup; //Khởi tạo svg vẽ phả đồ
var zoomListener;
var treeId;
// node size
var nodeWidth = 50; //Chiều rộng của node
var nodeHeight = 86; //Chiều cao của node
var imgWidth = 40;
var imgHeight = 40;
var txtHeight = 40;
var btnDetail = 14;
var spaceSpouse = 10; //Khoảng cách giữa các node hôn phu
var spaceWithSpouse = 10; //khoảng cách cộng thêm theo chiều ngang giữa các node con khi có hôn phu
var isDiedWidthIcon = 10;
var isDiedHeightIcon = 14;
var spaceNodeX = nodeWidth + 30; //Khoảng cách giữa các node theo chiều ngang
var spaceNodeY = nodeHeight * 2; //Khoảng cách giữa các node theo chiều dọc

// Calculate max label length
var maxLabelLength = 20; //Tạm thời chưa sử dụng biến này

// variables for drag/drop
// var selectedNode = null;
// var draggingNode = null;

// panning variables
// var panSpeed = 200;
// var panBoundary = 20; // Within 20px from edges will pan when dragging.?

var duration = 750; //Thời gian chạy hiệu ứng
var root;

// size of the diagram
var viewerWidth = document.querySelector('.phado').offsetWidth - 20;
var viewerHeight = Math.min(window.innerHeight, 700);

//Mảng chọn người để xem xưng hô
var selectedRelationshipNodes = [];

// Flag để tránh render lại option select-deep
var isDeepOptionRendered = false;

//Ẩn hiện node hôn phối
var hiddenNodeSpouses = "HIDDEN_NODE_SPOUSES";
let isCheckedHiddenNodeSpouses = localStorage.getItem(hiddenNodeSpouses) === "true";  //Lấy dữ liệu isCheckedHiddenNodeSpouses tải lần đầu

// Hàm tải dữ liệu từ API
function loadTreeData(treeId, rootId, selectedDeep) {
    let code = localStorage.getItem('GENEALOGY_SECURITY_CODE') || '';
    isCheckedHiddenNodeSpouses = localStorage.getItem(hiddenNodeSpouses) === "true"; //Lấy dữ liệu isCheckedHiddenNodeSpouses mới
    data = JSON.parse(datajson);
    let url = `/api/person/cay-gia-pha?tree-id=${treeId}&root-id=${rootId ? rootId : ''}&code=${code}&deep=${selectedDeep}&hidden-spouses=${isCheckedHiddenNodeSpouses}`;
    // d3.json(url).then(function (data) {
        treeData = data; // Cập nhật dữ liệu mới cho treeData
        if (treeData) {
            if (treeData.result && !treeData.result.success) {
                $('#loading').addClass("text-danger").text(treeData.result.message);
                if (treeData.result.errorCode == 401) {
                    $('#input-code').modal('show');
                    return;
                }
                return;
            }
            treeData = treeData.object;
        }
        if (!treeData || (Array.isArray(treeData) && treeData.length === 0)) {
            $('#loading').hide();
            return; // Dừng nếu không có dữ liệu
        }
        $('#loading').hide();
        $('#htree').show();
        $('.phado-tools').show();

        // Tính độ sâu tối đa để tạo option select giới hạn thế hệ
        if (!isDeepOptionRendered) {
            let maxDepth = getMaxDepth(treeData);
            renderOptionSelectDeep(maxDepth);
            isDeepOptionRendered = true;
        }

        // Vẽ lại cây với dữ liệu mới
        updateTree();

        $('#dlginfo').hide();
    // }).catch(function (error) {
    //     console.error('Error loading tree data:', error);
    // });
    // Khi cây vẽ xong, kích hoạt sự kiện
    $(document).trigger("treeRendered");
}

// Hàm vẽ lại cây (bạn cần định nghĩa hàm này theo yêu cầu của mình)
function updateTree() {

    //Khởi tạo thông số thống kê ban đầu khi load tree (hiển thị ở thống kê phả đồ)
    let totalNodes = 0;
    let totalMales = 0;
    let totalFemales = 0;
    let maxDepth = 0; // Độ sâu của cây tương đương số đời gia phả

    sortTreeData(treeData); //Sắp xếp theo dữ liệu trường order (của con cái, hôn phu)

    // Duyệt qua cây gia phả và tính toán maxLabelLength, totalNodes, thông số thống kê
    function visit(parent, visitFn, childrenFn, spouseFn) {
        if (!parent) return;

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
            children.forEach(child => visit(child, visitFn, childrenFn, spouseFn));
        }

        var spouses = spouseFn(parent);
        if (spouses) {
            spouses.forEach(spouse => visit(spouse, visitFn, childrenFn, spouseFn));
        }
    }
    visit(treeData, function (d) {
        totalNodes++;
        if (d.gender == "Nữ") {
            totalFemales++;
        } else {
            totalMales++;
        }
        //maxLabelLength = Math.max(d.fullName.length, maxLabelLength);

    }, function (d) {
        return d.children && d.children.length > 0 ? d.children : null;
    }, function (d) {
        return d.spouses && d.spouses.length > 0 ? d.spouses : null;
    });

    function zoom(event) {
        svgGroup.attr("transform", event.transform);
    }

    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
    zoomListener = d3.zoom()
        .scaleExtent([0.06, 4]) // Giới hạn mức zoom
        .on("zoom", zoom);

    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // define the baseSvg, attaching a class for styling and the zoomListener
    baseSvg = d3.select("#htree").append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .attr("class", "overlay-phado br-15")
        .call(zoomListener)
        .on("contextmenu", function (event) {
            event.preventDefault();
        });

    svgGroup = baseSvg.append("g");

    //Tạo nhóm g riêng để hiển thị chú thích số dòng
    const rowLinesGroup = svgGroup.append("g").attr("class", "row-lines-group");

    root = d3.hierarchy(treeData);
    root.x0 = viewerHeight / 2;
    root.y0 = 0;
    update(root);
    topNode(root);

    //var maxX = d3.max(root, d => d.x);
    //var maxY = d3.max(root, d => d.y);
    //var treeHeight = maxY;
    //var treeWidth = maxX + nodeWidth;
    //var nodeMaxX = root.find(d => d.x === maxX);
    //if (nodeMaxX && nodeMaxX.data.spouses) {
    //    var numberOfSpouses = nodeMaxX.data.spouses.length;
    //    var treeWidth = maxX + (numberOfSpouses + 1) * nodeWidth;
    //}
    //zoomToFit(treeWidth, treeHeight);

    function update(source) {

        if (totalNodes) {
            $('.phado-tools-right').show();
            $('#statistic-members').html(`
                <div class="total-members"><b>- Tổng:</b> <b>${totalNodes}</b> thành viên (<b>${totalMales}</b> nam, <b>${totalFemales}</b> nữ)</div>
            `);
        } else {
            $('.phado-tools-right').hide();
        }

        //Bố trí lại tọa độ x, y của node đối với phả đồ đường ngang chữ L
        if (lineStyle == "horizontal") {
            assignX(source);
            assignY(source);
            var nodes = source.descendants(),
            links = nodes.slice(1);
        } else {
	     spaceNodeX = 150;
            //Tạo chiều rộng tự động cho khung của cây gia phả (newHeight) bằng cách lấy hàng ngang có số lượng node nhiều nhất * spaceNodeX
            // Mục đích tránh đè các node khi hiển thị, nếu chiều rộng cố định các node có thể bị đè lên nhau
            var levelWidth = [1];
            var childCount = function (level, n) {
                // Nếu node có con cái, tiếp tục đệ quy tính toán cho các con
                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) levelWidth.push(0);
                    // Cộng số lượng con cái vào levelWidth
                    levelWidth[level + 1] += n.children.length;
                    // Cộng số lượng vợ/chồng của con cái vào cấp độ tiếp theo
                    n.children.forEach(function (d) {
                        levelWidth[level + 1] += (d.data.spouses ? d.data.spouses.length : 0);
                        childCount(level + 1, d); // Đệ quy tính tiếp cho các con của node hiện tại
                    });
                }
            };
            childCount(0, root);
            var newHeight = d3.max(levelWidth) * spaceNodeX;
            var treeData = d3.tree().size([newHeight, viewerWidth])(root);

            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            // Thiết lập lại chiều cao, chiều rộng giữa các node.
            nodes.forEach(function (d) {
                var spouseCount = (d.data.spouses && d.data.spouses.length) ? d.data.spouses.length : 0;

                //Nếu có hôn phu thì tự tăng thêm chiều rộng
                if (spouseCount > 0) {
                    nodes.forEach(function (n) {
                        if (n.depth === d.depth && n.x > d.x) {
                            n.x += spouseCount * (nodeWidth + spaceWithSpouse);
                        }
                    });
                }

                //chiều cao tự thay đổi theo maxLabelLength
                //d.y = (d.depth * (maxLabelLength * 10));
                d.y = d.depth * spaceNodeY;
            });
        }



        // ****************** Nodes section ***************************

        // Khởi tạo node theo data
        var node = svgGroup.selectAll('g.node')
            .data(nodes, function (d) {
                return d.personId || (d.personId = ++i);
            });

        // Vẽ đường ngang nét đứt để hiển thị chú thích số dòng
        drawRowLine(rowLinesGroup, nodes);

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            // .call(dragListener)
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            });

        nodeEnter.append("g")
            .attr("class", "node-main")
            .attr('x', -(nodeWidth + 8) / 2)
            .attr('y', 0)
            .attr('width', nodeWidth + 8)
            .attr('height', nodeHeight + 4)
            .each(function (d, i) {
                d3.select(this)
                    .append("rect")
                    .attr("x", -nodeWidth / 2)
                    .attr("y", 0)
                    .attr("height", nodeHeight)
                    .attr("width", nodeWidth);

                if (d.data.NamMat || d.data.isDied) {
                    d3.select(this)
                        .append("image")
                        .attr("class", "is-died")
                        .attr('x', nodeWidth / 2 - isDiedWidthIcon + 1)
                        .attr('y', nodeHeight - isDiedHeightIcon +  2)
                        .attr("width", isDiedWidthIcon)
                        .attr("height", isDiedHeightIcon)
                        .attr("xlink:href", function () {
                            return '/gia-pha/img/is-died-icon.png';
                        });
                }

                d3.select(this)
                    .append("image")
                    .attr('x', -(nodeWidth + 8) / 2)
                    .attr('y', 0)
                    .attr("width", nodeWidth + 8)
                    .attr("height", nodeHeight + 4)
                    .attr("xlink:href", function () {
                        return '/gia-pha/img/mframe.png';
                    });

                d3.select(this)
                    .append("image")
                    .attr('x', -imgWidth / 2)
                    .attr('y', 5)
                    .attr("width", imgWidth)
                    .attr("height", imgHeight)
                    .attr("xlink:href", function () {
                        let defaultAvatar = '/gia-pha/img/default-avatar.jpg';
                        if (d.data.gender && d.data.gender == "Nữ") {
                            defaultAvatar = '/gia-pha/img/default-avatar-female.jpg';
                        }
                        return d.data.avatar ? d.data.avatar + '?w=200&h=200&crop=auto&scale=both' : defaultAvatar;
                    });

                d3.select(this)
                    .append("foreignObject")
                    .attr("x", -nodeWidth / 2)
                    .attr("y", imgHeight + 8)
                    .attr("width", nodeWidth)
                    .attr("height", txtHeight)
                    .attr("class", "outside-node-main")
                    .html(`<p class="fullname">${d.data.fullName}</p><p class="nsnm">(${d.data.nsnm})</p>`);

                d3.select(this)
                    .append("foreignObject")
                    .attr("x", -(nodeWidth + 8) / 2)
                    .attr("y", 0)
                    .attr("width", nodeWidth + 8)
                    .attr("height", nodeHeight + 4)
                    .attr("class", "outside-node-main");

                d3.select(this)
                    .append("foreignObject")
                    .attr("x", (nodeWidth / 2) - 15)
                    .attr("y", 2)
                    .attr("width", btnDetail + 2)
                    .attr("height", btnDetail + 2)
                    .attr("class", "bg-person-detail");

                d3.select(this)
                    .append("foreignObject")
                    .attr("x", -nodeWidth / 2)
                    .attr("y", 2)
                    .attr("width", btnDetail)
                    .attr("height", btnDetail)
                    .attr("class", "generation-order")
                    .html(`${d.data.generationOrder}`);

                d3.select(this)
                    .append("image")
                    .attr("x", (nodeWidth / 2) - 14)
                    .attr("y", 3)
                    .attr("width", btnDetail)
                    .attr("height", btnDetail)
                    .attr("xlink:href", function () {
                        if (d.data.gender == "Nữ") {
                            return '/gia-pha/img/female.gif';
                        } else {
                            return '/gia-pha/img/male.gif';
                        }
                    })
                    .on("click", function (event, d) {
                        event.preventDefault();
                        var x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        var y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                        var o = { x: x, y: y };
                        openNodeMainMenu(d, o);
                    });

                if (d.children && d.children.length > 0) {
                    d3.select(this)
                        .append("foreignObject")
                        .attr("x", -7)
                        .attr("y", nodeHeight - 3)
                        .attr("width", btnDetail + 1)
                        .attr("height", btnDetail)
                        .attr("class", "toggle-node")
                        .html(`<i class="fa fa-minus"></i>`)
                        .on("click", function (event, d) {
                            event.preventDefault();
                            toggleNode(d);
                            var icon = d3.select(this).select("i");
                            if (icon.classed("fa-minus")) {
                                icon.classed("fa-minus", false)
                                    .classed("fa-plus", true);
                            } else {
                                icon.classed("fa-plus", false)
                                    .classed("fa-minus", true);
                            }
                        });
                }

                d3.select(this)
                    .append("foreignObject")
                    .attr("x", -9)
                    .attr("y", -9)
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("class", "select-relationship")
                    .style("display", d3.select(".btn-relationship").classed("active") ? "block" : "none")
                    .html(`<div class="select-relationship-btn"></div>`)
                    .on("click", function (event, d) {
                        event.preventDefault();
                        const el = d3.select(this);
                        const personId = d.data.personId;
                        // Nếu đã chọn, bỏ chọn (thêm/bỏ active)
                        if (el.classed("active")) {
                            el.classed("active", false);
                            selectedRelationshipNodes = selectedRelationshipNodes.filter(id => id !== personId);
                        } else {
                            // Nếu đã chọn 2 rồi thì không cho chọn thêm
                            if (selectedRelationshipNodes.length >= 2) return;
                            el.classed("active", true);
                            selectedRelationshipNodes.push(personId);
                        }
                        // Khi đủ 2 node, hiển thị modal
                        if (selectedRelationshipNodes.length === 2) {
                            showRelationshipModal(selectedRelationshipNodes);
                        }
                    });
            });

        nodeEnter.on("mouseover", function (e, d) {
            // Hiển thị và highlight đường nối đến hôn phu
            const pathData = d3.selectAll('path.children-spouse-link')
                .filter(function (linkData) {
                    return linkData.data.personId === d.data.personId;
                });
            pathData
               /* .style("opacity", 1)
                .style("stroke", "#ff5307ad");*/
                .classed("highlighted", true);

            // tooltip.transition()
            //   .duration(duration)
            //   .style("opacity", .9);
            // tooltip.html(d.data.name)
            //   .style("left", (e.pageX) + "px")
            //   .style("top", (e.pageY - 28) + "px");
        })
            .on("mouseout", function (e, d) {

                const pathData = d3.selectAll('path.children-spouse-link')
                    .filter(function (linkData) {
                        return linkData.data.personId === d.data.personId;
                    });

                //Duyệt spouse node cha, nếu có isHighlighted thì giữ nguyên đường dẫn
                pathData.each(function (linkData) {
                    const parentNode = linkData.parent.data;
                    if (parentNode && parentNode.spouses) {
                        parentNode.spouses.forEach(function (spouse) {
                            if (spouse.personId === d.data.motherId || spouse.personId === d.data.fatherId) {
                                if (spouse.isHighlighted === false) {
                                    pathData
                                        //.style("opacity", 0)
                                    //.style("stroke", null)
                                        .classed("highlighted", false);
                                }
                            }
                        });
                    }
                });

                // tooltip.transition().duration(duration).style("opacity", 0);
            })
            //.on("click", function (e, d) {
            //    toggleNode(e, d);
            //})
            .on("contextmenu", function (event, d) {
                event.preventDefault();
                if (d3.select(event.target).classed("outside-node-main")) {
                    var x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    var y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    var o = { x: x, y: y };
                    openNodeMainMenu(d, o);
                }
            })
            //.on("click", function (event, d) {
            //    if ($(".btn-relationship").hasClass("active")) {
            //        event.preventDefault();
            //        $(this).find(".node-main .select-relationship").trigger("click");
            //    }
            //});

        function openNodeMainMenu(d, o) {
            d3.select('#dlginfo')
                .style('position', 'absolute')
                .style('left', o.x + "px")
                .style('top', o.y + "px")
                .style('display', 'block')
                .on('mouseleave', function () {
                    d3.select('#dlginfo').style('display', 'none');
                });
            $('p.more_info a').off('click').on('click', function (event) {
                event.preventDefault();
                showInfo(d.data.personId);
            });
            $('p.view_laters a').off('click').on('click', function (event) {
                event.preventDefault();
                changeRootId(treeId, d.data.personId, selectedDeep);
            });
            $('p.view_root a').off('click').on('click', function (event) {
                event.preventDefault();
                changeRootId(treeId, rootId, selectedDeep);
            });
        }

        // Node hôn phu
        var nodeSpouse = nodeEnter.selectAll('.spouse')
            //.data(d => d.data.spouses || [])
            .data(d => {
                if (d.data.spouses) {
                    return d.data.spouses.map(spouse => {
                        spouse.spouseId = d.data.personId; // Thêm personId của node chính vào data của node spouse
                        return spouse;
                    });
                }
                return [];
            })
            .enter()
            .append("g")
            .attr("class", "spouse");

        nodeSpouse.each(function (d, i) {
            d.index = i; // Gán i cho thuộc tính index của d, sử dụng dữ liệu này cho sự kiện bên dưới (mouseover, mouseleave, ...)
            d.isHighlighted = false; // Gán biến cờ cho từng nodeSpouse

            const x = getSpouseX(i);
            d3.select(this)
                .append("rect")
                .attr("class", "rect-spouse")
                .attr("x", x)
                .attr("y", 0)
                .attr("height", nodeHeight)
                .attr("width", nodeWidth);

            if (d.NamMat || d.isDied) {
                d3.select(this)
                    .append("image")
                    .attr("class", "is-died")
                    .attr('x', x + nodeWidth - isDiedWidthIcon + 1)
                    .attr('y', nodeHeight - isDiedHeightIcon + 2)
                    .attr("width", isDiedWidthIcon)
                    .attr("height", isDiedHeightIcon)
                    .attr("xlink:href", function () {
                        return '/gia-pha/img/is-died-icon.png';
                    });
            }

            d3.select(this)
                .append("image")
                .attr('x', x - 4)
                .attr('y', 0)
                .attr("width", nodeWidth + 8)
                .attr("height", nodeHeight + 4)
                .attr("xlink:href", function () {
                    return '/gia-pha/img/mframe.png';
                });

            d3.select(this)
                .append("image")
                .attr('x', x+5)
                .attr('y', 5)
                .attr("width", imgWidth)
                .attr("height", imgHeight)
                .attr("xlink:href", function () {
                    let defaultAvatar = '/gia-pha/img/default-avatar.jpg';
                    if (d.gender && d.gender == "Nữ") {
                        defaultAvatar = '/gia-pha/img/default-avatar-female.jpg';
                    }
                    return d.avatar ? d.avatar + '?w=200&h=200&crop=auto&scale=both' : defaultAvatar;
                });

            d3.select(this)
                .append("foreignObject")
                .attr("x", x)
                .attr("y", imgHeight + 8)
                .attr("width", nodeWidth)
                .attr("height", txtHeight)
                .attr("class", "outside-node-spouse")
                .html(`<p class="fullname">${d.fullName}</p><p class="nsnm">(${d.nsnm})</p>`);

            d3.select(this)
                .append("foreignObject")
                .attr("x", x - 4)
                .attr("y", 0)
                .attr("width", nodeWidth + 8)
                .attr("height", nodeHeight + 4)
                .attr("class", "outside-node-spouse");

            d3.select(this)
                .append("foreignObject")

                .attr("x", (x + nodeWidth) - 15)
                .attr("y", 2)
                .attr("width", btnDetail + 2)
                .attr("height", btnDetail + 2)
                .attr("class", "bg-person-detail");

            d3.select(this)
                .append("image")
                .attr("x", (x + nodeWidth) - 14)
                .attr("y", 3)
                .attr("width", btnDetail)
                .attr("height", btnDetail)
                .attr("xlink:href", function () {
                    if (d.gender == "Nữ") {
                        return '/gia-pha/img/female.gif';
                    } else {
                        return '/gia-pha/img/male.gif';
                    }
                })
                .on("click", function (event, d) {
                    event.preventDefault();
                    var x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    var y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    var o = { x: x, y: y };
                    openNodeSpouseMenu(d, o);
                });

            d3.select(this)
                .append("foreignObject")
                .attr("x", x + (nodeWidth / 2) - 7)
                .attr("y", nodeHeight - 3)
                .attr("width", btnDetail + 1)
                .attr("height", btnDetail)
                .attr("class", "children-path")
                .html(`<i class="fas fa-sitemap"></i>`);

            d3.select(this)
                .append("foreignObject")
                .attr("x", x + (nodeWidth / 2) - 9)
                .attr("y", -9)
                .attr("width", 18)
                .attr("height", 18)
                .attr("class", "select-relationship")
                .style("display", d3.select(".btn-relationship").classed("active") ? "block" : "none")
                .html(`<div class="select-relationship-btn"></div>`)
                .on("click", function (event, d) {
                    event.preventDefault();

                    const el = d3.select(this);
                    const personId = d.personId;
                    // Nếu đã chọn, bỏ chọn (thêm/bỏ active)
                    if (el.classed("active")) {
                        el.classed("active", false);
                        selectedRelationshipNodes = selectedRelationshipNodes.filter(id => id !== personId);
                    } else {
                        // Nếu đã chọn 2 rồi thì không cho chọn thêm
                        if (selectedRelationshipNodes.length >= 2) return;
                        el.classed("active", true);
                        selectedRelationshipNodes.push(personId);
                    }
                    // Khi đủ 2 node, hiển thị modal
                    if (selectedRelationshipNodes.length === 2) {
                        showRelationshipModal(selectedRelationshipNodes);
                    }
                });

        });

        // Thêm sự kiện hover cho node hôn phu (làm nổi bật đường nối node con của họ)
        nodeSpouse.on("mouseover", function (e, d) {
            // Lấy giá trị i từ d.index
            const i = d.index;
            // Làm nổi bật đường nối từ node con đến node hôn phu
            const childrensData = svgGroup.selectAll('path.children-spouse-link')
                .filter(function (linkData) {
                    return linkData.data.motherId === d.personId || linkData.data.fatherId === d.personId; //(linkData là node con, d là node cha)
                });
            childrensData
                //.style("stroke", "#ff5307ad")
            //.style("opacity", 1);
                .classed("highlighted", true);

            const hasChildren = svgGroup.selectAll('path.children-spouse-link')
                .filter(function (linkData) {
                    return linkData.data.motherId === d.personId || linkData.data.fatherId === d.personId;
                })
                .size() > 0;

            // Nếu có con thì hiển thị icon đường dẫn
            if (hasChildren) {
                const x = getSpouseX(i);
                d3.select(this)
                    .select('.children-path')
                    .style("display", "block")
                    .on("click", function (e, d) {
                        e.preventDefault();
                        d.isHighlighted = !d.isHighlighted; // Đổi trạng thái khi click
                        var icon = d3.select(this).select("i");
                        if (icon.classed("fa-sitemap")) {
                            icon.classed("fa-sitemap", false)
                                .classed("fa-hand-point-down", true);
                        } else {
                            icon.classed("fa-hand-point-down", false)
                                .classed("fa-sitemap", true);
                        }
                    });
            }

            // tooltip.transition()
            //   .duration(duration)
            //   .style("opacity", .9);
            // tooltip.html(d.fullName)
            //   .style("left", (e.pageX) + "px")
            //   .style("top", (e.pageY - 28) + "px");

        })
            .on("mouseout", function (e, d) {
                // Nếu không có highlight, thì ẩn children-path
                if (!d.isHighlighted) {
                    d3.select(this)
                        .select('.children-path')
                        .style("display", "none");
                }
                // Không ẩn childrensData nếu isHighlighted là true
                if (!d.isHighlighted) {
                    svgGroup.selectAll('path.children-spouse-link')
                        .filter(function (linkData) {
                            return linkData.data.motherId === d.personId || linkData.data.fatherId === d.personId;
                        })
                        //.style("stroke", null)
                    //.style("opacity", null);
                        .classed("highlighted", false);
                }
                // tooltip.transition().duration(duration).style("opacity", 0);
            })
            .on("contextmenu", function (event, d) {
                event.preventDefault();
                if (d3.select(event.target).classed("outside-node-spouse")) {
                    var x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    var y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

                    var o = { x: x, y: y };
                    openNodeSpouseMenu(d, o);
                }
            });

        function openNodeSpouseMenu(d, o) {
            d3.select('#dlginfo')
                .style('position', 'absolute')
                .style('left', o.x + "px")
                .style('top', o.y + "px")
                .style('display', 'block')
                .on('mouseleave', function () {
                    d3.select('#dlginfo').style('display', 'none');
                });
            $('p.more_info a').off('click').on('click', function (event) {
                event.preventDefault();
                showInfoSpouse(d.spouseId, d.personId);
            });
            $('p.view_laters a').off('click').on('click', function (event) {
                event.preventDefault();
                changeRootId(treeId, d.spouseId, selectedDeep);
            });
            $('p.view_root a').off('click').on('click', function (event) {
                event.preventDefault();
                changeRootId(treeId, rootId, selectedDeep);
            });
        }

        function toggleNode(d) {
            d = toggleChildren(d);
            update(d);
            topNode(d);
        }

        // Toggle children function
        function toggleChildren(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else if (d._children) {
                d.children = d._children;
                d._children = null;
            }
            return d;
        }

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Fade the text in
        nodeUpdate.select('text')
            .style('fill-opacity', 1);

        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        // On exit reduce the node rects size to 0
        nodeExit.select('rect')
            .attr('width', 0)
            .attr('height', 0);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 0);


        var link = svgGroup.selectAll('path.link')
            .data(links, function (d) { return d.personId; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function (d) {
                var o = { x: source.x0, y: source.y0 }
                //return diagonal(o, o);
                return drawLine(o, o);
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) {
                //return diagonal(d, d.parent);
                return drawLine(d, d.parent);
            });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y }
                //return diagonal(o, o);
                return drawLine(o, o);
            })
            .remove();

        //Tạo đường dẫn từ hôn phu đến node con của họ
        var spouseLink = svgGroup.selectAll('path.children-spouse-link')
            .data(nodes.filter(d => d.parent && d.parent.data.spouses && d.parent.data.spouses.length > 1 && (d.data.fatherId || d.data.motherId)),
                function (d) {
                    return d.data.personId + '-children-spouse';
                }
            );

        // Enter any new spouse links
        var spouseLinkEnter = spouseLink.enter().insert('path', "g")
            .attr("class", `children-spouse-link ${lineStyle}`)
            .attr('d', function (d) {
                var o = { x: source.x0, y: source.y0 };
                //return diagonal(o, o);
                return drawLine(o, o);
            });

        // UPDATE
        var spouseLinkUpdate = spouseLinkEnter.merge(spouseLink);

        // Transition the spouse links to the proper position
        spouseLinkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) {

                // Tìm node hôn phu trong danh sách hôn phu của node chính (hôn phu của node chính có thể là cha hoặc mẹ )
                var mainNode = nodes.find(node => node.data.personId === d.parent.data.personId);
                var spouseIndexNode = d.parent.data.spouses.findIndex(spouse => spouse.personId === d.data.motherId || spouse.personId === d.data.fatherId);

                if (spouseIndexNode !== -1) {
                    // Tính toán vị trí hôn phu của node chính và vẽ đường nối
                    var spouseNodeX = mainNode.x + getSpouseX(spouseIndexNode) + nodeWidth / 2;
                    var spouseNodeY = mainNode.y;
                    var spouseNode = { x: spouseNodeX, y: spouseNodeY };

                    var offset = (spouseIndexNode - 1) * 7; // Điều chỉnh khoảng cách giữa các đường nối
                    return drawLine(d, spouseNode, offset);
                    //return diagonal(d, spouseNode);
                    //return drawLine(d, spouseNode);
                }
            });

        // Remove any exiting spouse links
        var spouseLinkExit = spouseLink.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y };
                //return diagonal(o, o);
                return drawLine(o, o);
            })
            .remove();

        nodes.forEach(function (d) {
            d.x0 = d.y + 50;
            d.y0 = d.x;
        });

        // Khi cây vẽ xong, kích hoạt sự kiện
        $(document).trigger("treeRendered");
    }

    // Hàm lấy vị trí X của hôn phu
    function getSpouseX(i) {
        return i * nodeWidth + (nodeWidth / 2 + spaceSpouse) + i * spaceSpouse;
    }

    function centerNode(source) {
        var transform = d3.zoomTransform(baseSvg.node());
        var scale = transform.k;
        var x = -source.y0 * scale + viewerWidth / 2;
        var y = -source.x0 * scale + viewerHeight / 2;
        svgGroup.transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")")
            .on("end", function () {
                // Cập nhật trạng thái của zoomListener
                zoomListener.transform(baseSvg, d3.zoomIdentity.translate(x, y).scale(scale));
            });
    }

    function topNode(source) {
        var transform = d3.zoomTransform(baseSvg.node());
        var scale = transform.k;
        var x = -source.y0 * scale + viewerWidth / 2;
        var y = -source.x0 * scale + 100;
        svgGroup.transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")")
            .on("end", function () {
                // Cập nhật trạng thái của zoomListener
                zoomListener.transform(baseSvg, d3.zoomIdentity.translate(x, y).scale(scale));
            });
    }

    function zoomToFit(treeWidth, treeHeight) {
        var scaleX = viewerWidth / treeWidth;
        var scaleY = viewerHeight / treeHeight;
        var scale = Math.min(scaleX, scaleY);
        var x = (viewerWidth - treeWidth * scale) / 2;
        var y = 20;
        svgGroup.transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ") scale(" + scale + ")")
            .on("end", function () {
                zoomListener.transform(baseSvg, d3.zoomIdentity.translate(x, y).scale(scale));
            });
    }

    function drawLine(s, d, offset = 0) {
        switch (lineStyle) {
            case "straight":
                return straightLine(s, d);
            case "horizontal":
                return straightLineWithHorizontal(s, d, offset);
            default:
                return diagonal(s, d);
        }
    }

    // Định nghĩa đường cong nối giữa các node
    function diagonal(s, d) {
        // Tính toán tọa độ cho đường nối
        var sourceX = s.x; // Tọa độ x của node con
        var sourceY = s.y; // Tọa độ y của node con
        var targetX = d.x; // Tọa độ x của node cha
        var targetY = d.y + nodeHeight; // Tọa độ y của node cha, cộng chiều cao của node

        // Tính toán điểm kiểm soát cho đường cong Bezier
        var controlX1 = sourceX;
        var controlY1 = (sourceY + targetY) / 2; // Điểm kiểm soát đầu tiên
        var controlX2 = targetX;
        var controlY2 = (sourceY + targetY) / 2; // Điểm kiểm soát thứ hai

        // Vẽ đường nối Cubic Bezier
        return "M" + sourceX + "," + sourceY
            + "C" + controlX1 + "," + controlY1
            + " " + controlX2 + "," + controlY2
            + " " + targetX + "," + targetY;
    }

    // Đường nối thẳng giữa các node cha con
    function straightLine(s, d) {
        // Tính toán tọa độ cho đường nối
        var sourceX = s.x; // Tọa độ x của node con
        var sourceY = s.y; // Tọa độ y của node con
        var targetX = d.x; // Tọa độ x của node cha
        var targetY = d.y + nodeHeight; // Tọa độ y của node cha, cộng chiều cao của node

        // Vẽ đường thẳng
        return "M" + sourceX + "," + sourceY
            + "L" + targetX + "," + targetY;
    }

    // Đường nối ngang giữa các node cha con
    function straightLineWithHorizontal(s, d, offet = 0) {
        // Tọa độ x và y của node con
        var sourceX = s.x;
        var sourceY = s.y;
        //console.log(offet);
        // Tọa độ x và y của node cha
        var targetX = d.x;
        var targetY = d.y + nodeHeight;

        // Tọa độ y của điểm giữa nơi đường đi ngang
        var midY = sourceY + (targetY - sourceY) / 2 - offet;

        // Vẽ đường thẳng: Đi xuống, đi ngang, rồi lại đi xuống
        return "M" + sourceX + "," + sourceY  // Điểm bắt đầu (node con)
            + "V" + midY                      // Đi xuống đến giữa
            + "H" + targetX                   // Đi ngang
            + "V" + targetY;                  // Đi xuống đến node cha
    }

    // Vẽ đường ngang chú thích số dòng
    function drawRowLine(rowLinesGroup, nodes) {
        rowLinesGroup.selectAll(".row-line").remove();
        rowLinesGroup.selectAll(".row-label").remove();

        // Tìm mức sâu lớn nhất của cây
        maxDepth = d3.max(nodes, d => d.depth);

        if (maxDepth > 0) {
            $('#max-depth').html(`<b>- Thế hệ: ${maxDepth + 1}</b>`);
        } else {
            $('#max-depth').html('');
        }

        // Tọa độ x chung cho tất cả các node
        const xPositions = nodes.map(d => d.x);
        const xStart = d3.min(xPositions) - nodeWidth*2;
        const xEnd = d3.max(xPositions) + nodeWidth*3;

        // Duyệt qua từng mức sâu từ 1 đến maxDepth
        for (let depth = 0; depth <= maxDepth; depth++) {
            // Tìm tất cả các node con ở mức depth hiện tại
            const nodesAtDepth = nodes.filter(d => d.depth === depth);

            // Nếu có node ở mức độ này
            if (nodesAtDepth.length > 0) {
                // Tìm tọa độ y cho đường ngang ở giữa các node cùng hàng
                const y = d3.mean(nodesAtDepth, d => d.y + (nodeHeight / 2));

                // Tính khoảng cách x từ node đầu tiên đến node cuối cùng của hàng
                //const xStart = d3.min(nodesAtDepth, d => d.x) - nodeWidth / 2;
                //const xEnd = d3.max(nodesAtDepth, d => d.x) + nodeWidth / 2;

                // Vẽ đường ngang
                rowLinesGroup.append("line")
                    .attr("class", "row-line")
                    .attr("x1", xStart)
                    .attr("x2", xEnd)
                    .attr("y1", y)
                    .attr("y2", y)
                    .attr("stroke", "#ccc")
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "5,5");

                // Thêm nhãn cho hàng
                const labelSpacing = nodeWidth*6; // Khoảng cách giữa các nhãn
                for (let x = xStart; x <= xEnd; x += labelSpacing) {
                    rowLinesGroup.append("text")
                        .attr("class", "row-label")
                        .attr("x", x)
                        .attr("y", y - 10) // Vị trí y của nhãn
                        .attr("dy", "0.35em")
                        .text(`${depth+1}`)
                        .style("font-size", "12px")
                        .style("fill", "#ccc");
                }
            }
        }
    }

}

// // Gọi hàm loadTreeData với root-id ban đầu
loadTreeData(treeId, rootId, selectedDeep);

// Thay đổi root-id
function changeRootId(treeId, rootId, selectedDeep) {
    // Xóa cây cũ
    d3.select('#htree').selectAll('*').remove();
    $('#loading').show();
    $('.phado-tools').hide();
    loadTreeData(treeId, rootId, selectedDeep);
}

$(document).on('change', '.select-deep', function () {
    selectedDeep = $(this).val();
    if (!isNaN(selectedDeep)) {
        d3.select('#htree').selectAll('*').remove();
        $('#loading').show();
        $('.phado-tools').hide();
        // Gọi lại loadTreeData với param mới
        loadTreeData(treeId, rootId, selectedDeep);
    }
});

// Hàm tính độ sâu tối đa của cây
function getMaxDepth(node) {
    if (!node.children || node.children.length === 0) return 1;
    let childDepths = node.children.map(child => getMaxDepth(child));
    return 1 + Math.max(...childDepths);
}

function renderOptionSelectDeep(maxDepth) {
    let html = '<option value="">Giới hạn hiển thị</option>';
    if (maxDepth && maxDepth > 0) {
        for (i = 0; i < maxDepth; i++) {
            html += `<option value="${i}">${i + 1} thế hệ</option>`;
        }
    }
    $('.select-deep').html(html);
}

function findNodeById(id) {
    var result = null;

    function searchNode(node) {
        if (node.personId == id) {
            result = node;
            return;
        }
        if (node.children) {
            node.children.forEach(child => searchNode(child));
        }
    }

    searchNode(treeData);
    return result;
}

function showInfo(id) {
    var node = findNodeById(id);
    if (node) {
        let avatarDefault = '/gia-pha/img/default-avatar.jpg';
        if (node.gender == "Nữ") {
            avatarDefault = '/gia-pha/img/default-avatar-female.jpg';
        }
        $('#show-info #show-info-label').text(node.fullName);
        $('#show-info .modal-dialog').addClass('modal-lg');
        $('#show-info .modal-body').html(`
            <div class="row">
                <div class="col-12 text-center my-3">
                    <div class="avatar">
                        <img class="br-10" src="${node.avatar ? node.avatar + '?w=500&h=auto&crop=auto&scale=both' : avatarDefault}" />
                    </div>
                </div>
                <div class="col-12 mt-3">
                   <nav class="nav-info" id="nav-info">
                        <ul class="d-flex flex-wrap">
                            <li class="active" data-tab="#chung">Thông tin</li>
                            <li data-tab="#phuthe">Phu thê</li>
                            <li data-tab="#concai">Con</li>
                        </ul>
                   </nav>
                   <div class="tab-info" id="tab-info">
                        <div class="tab-panel show" id="chung">
                            <div class="person-info">Họ tên: <b>${node.fullName ? node.fullName : ''}</b></div>
                            <div class="person-info">Tên gọi khác: <b>${node.nickname ? node.nickname : ''}</b></div>
                            <div class="person-info">Ngày sinh: <b>${node.namSinh ? node.namSinh : ''}</b></div>
                            ${renderNamMat(node.namMat)}
                            <div class="person-info">Giới tính: <b>${node.gender ? node.gender : ''}</b></div>
                            <div class="person-info">Địa chỉ: <b>${node.address ? node.address : ''}</b></div>
                            <div class="person-info">Hiện trạng: <b>${node.isDied || node.namMat ? 'đã mất' : 'còn sống'}</b></div>
                            <div class="text-center mt-3">
                                <a class="read-more" href="/thanh-vien/${node.personKey}-${node.personId}.html" target="_blank">Xem thêm</a>
                            </div>
                        </div>
                        <div class="tab-panel" id="phuthe">
                            ${renderPhuThe(node.spouses)}
                        </div>
                        <div class="tab-panel" id="concai">
                            ${renderCon(node.children)}
                        </div>
                   </div>

                </div>
            </div>

        `);

        $('#show-info').modal('show');


        function renderPhuThe(spouses) {
            let html = '';
            if (spouses && spouses.length) {
                html += '<div class="list-phuthe">';
                $.each(spouses, function (key, spouse) {
                    html += `<div class="phuthe"><span class='fw-bold'>${spouse.fullName}</span></div>`;
                });
                html += `</div>`;
            }
            return html;
        }

        function renderCon(children) {
            let html = '';
            if (children && children.length) {
                html += '<div class="list-concai">';
                $.each(children, function (key, child) {
                    html += `
                        <div class="concai">
                        ${(key + 1) + ". " + "<span class='fw-bold'>" + child.fullName + "</span>"}
                        </div>
                    `;
                });
                html += `</div>`;
            }


            return html;
        }
    }
}

function showInfoSpouse(spouseId, id) {
    var mainNode = findNodeById(spouseId);
    var node = null;
    if (mainNode) {
        if (mainNode.spouses && mainNode.spouses.length) {
            // Duyệt qua danh sách spouses để tìm spouse có id trùng khớp
            node = mainNode.spouses.find(spouse => spouse.personId === id);
        }
        if (node) {
            let avatarDefault = '/gia-pha/img/default-avatar.jpg';
            if (node.gender == "Nữ") {
                avatarDefault = '/gia-pha/img/default-avatar-female.jpg';
            }
            $('#show-info #show-info-label').text(node.fullName);
            $('#show-info .modal-dialog').addClass('modal-lg');
            $('#show-info .modal-body').html(`
                <div class="row">
                    <div class="col-12 text-center my-3">
                        <div class="avatar">
                            <img class="br-10" src="${node.avatar ? node.avatar + '?w=500&h=auto&crop=auto&scale=both' : avatarDefault}" />
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                       <nav class="nav-info" id="nav-info">
                            <ul class="d-flex flex-wrap">
                                <li class="active" data-tab="#chung">Thông tin</li>
                                <li data-tab="#concai">Con</li>
                            </ul>
                       </nav>
                       <div class="tab-info" id="tab-info">
                            <div class="tab-panel show" id="chung">
                                <div class="person-info">Họ tên: <b>${node.fullName ? node.fullName : ''}</b></div>
                                <div class="person-info">Tên gọi khác: <b>${node.nickname ? node.nickname : ''}</b></div>
                                <div class="person-info">Ngày sinh: <b>${node.namSinh ? node.namSinh : ''}</b></div>
                                ${renderNamMat(node.namMat)}
                                <div class="person-info">Giới tính: <b>${node.gender ? node.gender : ''}</b></div>
                                <div class="person-info">Địa chỉ: <b>${node.address ? node.address : ''}</b></div>
                                <div class="person-info">Hiện trạng: <b>${node.isDied || node.namMat ? 'đã mất' : 'còn sống'}</b></div>
                                <div class="text-center mt-3">
                                    <a class="read-more" href="/thanh-vien/${node.personKey}-${node.personId}.html" target="_blank">Xem thêm</a>
                                </div>
                            </div>
                            <div class="tab-panel" id="concai">
                                ${renderConPhuThe(mainNode.children)}
                            </div>
                       </div>

                    </div>
                </div>

            `);

            $('#show-info').modal('show');

            function renderConPhuThe(children) {
                let html = '';
                if (children && children.length) {
                    html += '<div class="list-concai">';
                    let i = 1;
                    $.each(children, function (key, child) {
                        if (child.fatherId == id || child.motherId == id) {
                            html += `<div class="concai">${i + ". " + "<span class='fw-bold'>" + child.fullName + "</span>"}</div>`;
                            i++;
                        }
                    });
                    html += `</div>`;
                }
                return html;
            }
        }
    }
}

function renderNamMat(namMat) {
    let html = '';
    if (namMat) {
        html += `<div class="person-info">Ngày mất: <b>${namMat}</b></div>`
    }
    return html;
}

let matchedNodes = []; // Lưu trữ các node được tìm thấy
let currentIndex = 0;  // Chỉ số của node hiện tại

function findNodeByFullName(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    matchedNodes = []; // Reset danh sách kết quả

    if (searchTerm.length >= 3) {
        $('#clear-input-full-name').show();
        d3.selectAll('.node-main')
            .style('opacity', function (d) {
                let isMatch = matchesSearchTerm(d.data.fullName, searchTerm);
                if (isMatch) {
                    matchedNodes.push(d);
                }
                return isMatch ? 1 : 0.2;
            });

        d3.selectAll('.spouse')
            .style('opacity', function (d) {
                let isMatch = matchesSearchTerm(d.fullName, searchTerm);
                if (isMatch) {
                    // Truy cập node cha (class="node")
                    const parentNode = d3.select(this.parentNode);
                    // Lấy dữ liệu từ node-main
                    const mainNodeData = parentNode.select('.node-main').datum();
                    matchedNodes.push(mainNodeData);
                }
                return isMatch ? 1 : 0.2;
            });

        displayMatchCount(matchedNodes);

    } else {
        $('#clear-input-full-name').hide();
        $('#results-found').text('');
        //.hide();
        d3.selectAll('.node-main').style('opacity', 1);
        d3.selectAll('.spouse').style('opacity', 1);
    }
}

// Hàm để hiển thị số lượng kết quả tìm thấy
function displayMatchCount(matchedNodes) {
    let count = matchedNodes.length;
    if (count > 0) {
        let next = '';
        if (count > 1) {
            next = `<span id="next-node">Kế tiếp <i class="fas fa-angle-double-right"></i> <span id="current-search-index" class="text-danger fw-bold">${currentIndex+1}</span>/${count} </span>`;
        }
        $('#results-found').html(`Tìm thấy: <b class="text-danger">${count}</b> kết quả. ${next}`);
        currentIndex = 0; // Reset về node đầu tiên
        moveToNode(matchedNodes[currentIndex]); // Di chuyển đến node đầu tiên
    } else {
        $('#results-found').text(`Không tìm thấy`);
    }
    //$('#results-found').show();
}

function moveToNode(node) {
    const transform = d3.zoomTransform(baseSvg.node());
    const scale = transform.k;
    var x = -node.y0 * scale + viewerWidth / 2;
    var y = -node.x0 * scale + 100;

    svgGroup.transition()
        .duration(duration)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")")
        .on("end", function () {
            zoomListener.transform(baseSvg, d3.zoomIdentity.translate(x, y).scale(scale));
        });
}

// Xử lý khi nhấn nút Next
$(document).on('click', '#next-node', function () {
    let totalNodes = matchedNodes.length;
    if (totalNodes > 1) {
        let currentSearchIndex = $('#current-search-index');
        currentIndex = (currentIndex + 1) % matchedNodes.length;
        moveToNode(matchedNodes[currentIndex]);
        currentSearchIndex.text(currentIndex+1);
    }
});

function matchesSearchTerm(char, searchTerm) {
    if (char) {
        // Chuyển cả chuỗi tìm kiếm và tên về dạng không dấu và so sánh
        const normalizedChar = removeAccents(char.toLowerCase());
        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
        return normalizedChar.includes(normalizedSearchTerm);
    }
    return false;
}

function removeAccents(str) {
    const accentMap = {
        'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
        'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
        'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
        'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
        'đ': 'd', 'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
        'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Đ': 'D'
    };
    return str.replace(/[^A-Za-z0-9]/g, function (match) {
        return accentMap[match] || match;
    })
        .replace(/\s+/g, ' ')
        .trim();
}

function clearInput() {
    $('input[name="name"]').val('');
    $('#clear-input-full-name').hide();
    d3.selectAll('.node-main').style('opacity', 1);
    d3.selectAll('.spouse').style('opacity', 1);
    $('#results-found').text('');
    //.hide();
}

function collapse(d) {
    if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
    }
}

function sortTreeData(node) {
    sortSpouses(node);
    if (node.children) {
        node.children.sort(function (a, b) {
            return a.orderSort - b.orderSort;
        });
        node.children.forEach(function(child) {
            sortTreeData(child);
        });
    }
}

function sortSpouses(node) {
    if (node.spouses) {
        node.spouses.sort(function (a, b) {
            return a.orderSort - b.orderSort;
        });
    }
}

function hideInf() {
    $('#dlginfo').css('display', 'none');
}

function userManual() {
    $('#show-info .modal-dialog').addClass('modal-lg');
    $('#show-info #show-info-label').text('Hướng dẫn xem phả đồ');
    $('#show-info .modal-body').html(`
            <div class="row">
                <div class="col-12 my-3">
                    <ul>
                        <li>Cuộn chuột giữa để Phóng to - Thu nhỏ màn hình hiển thị</li>
                        <li>Giữ chuột trái và di chuột để di chuyển màn hình theo hướng mong muốn</li>
                        <li>
                            <div>
                                Bấm chuột phải vào từng thành viên hoặc nhấn vào nút chức năng trong cây gia phả để xem các thông tin khác.
                            </div>
                            <div class="text-center py-2">
                                <img class="user-manual-img br-10" src="/gia-pha/img/user-manual.jpg" />
                            </div>
                            <div>
                                Bao gồm các chức năng:
                            </div>
                            <ul>
                                <li><b>Xem thông tin chi tiết: </b>Xem các thông tin về thành viên đang chọn</li>
                                <li><b>Xem đời sau: </b>Xem cây gia phả đời sau của thành viên đang chọn</li>
                                <li><b>Trở về gốc: </b>Hiển thị lại cây gia phả bắt đầu từ thành viên đầu tiên</li>
                            </ul>
                        </li>
                        <li>
                            <b>Lưu ý:</b> Trường hợp số thành viên của cây gia phả quá đông, khó quan sát tổng thể,
                            bạn có thể bấm chuột phải vào thành viên bất kỳ, chọn <b>Xem đời sau</b>,
                            việc này sẽ giúp bạn hiển thị gọn cây gia phả tính từ đời thành viên bạn đang chọn,
                            do đó tốc độ sẽ nhanh hơn
                        </li>
                    </ul>
                </div>
                </div>
            </div>

        `);

    $('#show-info').modal('show');
}

function showRelationshipModal(selectedRelationshipNodes) {
    let person1 = selectedRelationshipNodes[0];
    let person2 = selectedRelationshipNodes[1];

    let modal = $("#relationship-modal");
    let loading = modal.find(".loading");
    let notification = $("#notification-relationship-modal");
    let resultContent = $('#result-relationship-modal');

    loading.show();
    notification.hide().html("");
    resultContent.html("");

    axios.get("/api/person/xung-ho", {
        params: {
            "tree-id": treeId,
            "person-id1": person1,
            "person-id2": person2
        }
    })
        .then(response => {
            try {
                modal.modal("show");
                const data = response?.data ?? {};
                //console.log(data);
                if (data.result?.success) {
                    let htmlRelationshipResult = renderRelationshipResult(data);
                    resultContent.html(htmlRelationshipResult);
                } else {
                    const errorMessage = data.result?.message ?? "Không có dữ liệu ";
                    notification.html(`<div class="alert alert-warning">${errorMessage}</div>`).show();
                }
            } catch (error) {
                console.error("Lỗi xử lý dữ liệu:", error);
                notification.html(`<div class="alert alert-danger">Lỗi xử lý dữ liệu, vui lòng thử lại</div>`);
            }
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
            notification.html(`<div class="alert alert-danger">Không thể truy vấn, vui lòng thử lại</div>`);
        })
        .finally(() => {
            loading.hide();
        });
}

$("#relationship-modal").on("hidden.bs.modal", function () {
    $(".select-relationship").removeClass("active");
    selectedRelationshipNodes = [];
});

function renderRelationshipResult(data) {
    let html = ``;
    html += `
            <div>
                <h5 class="mb-3 text-center">${data.relationship ? data.relationship : ''}</h1>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>${renderPersonInfo(data.role1)}</td>
                            <td>${renderPersonInfo(data.role2)}</td>
                        </tr>
                    </tbody>
                </table>
            <div>
        `;

    return html;
}

function renderPersonInfo(data) {
    let html = ``;

    let avatarDefault = '/gia-pha/img/default-avatar.jpg';
    if (data.person.gender == "Nữ") {
        avatarDefault = '/gia-pha/img/default-avatar-female.jpg';
    }

    html += `
            <div class="person-info text-center">
                <p class="fw-bold text-uppercase mb-2">${data.roleName ? data.roleName : ''}</p>
                <div class="avatar">
                    <img class="mb-2" src="${data.person.avatar ? data.person.avatar : avatarDefault}">
                </div>
                <div class="person-info-des">
                    <div class="fw-bold">
                        <a class="text-dark" href="/thanh-vien/${data.person.personKey}-${data.person.personId}.html" target="_blank">${data.person.fullName}</a>
                    </div>
                    <div class="person-nsnm">(${data.person.nsnm})</div>
                    <div class="person-gender">Giới tính: ${data.person.gender}</div>
                </div>
            </div>
        `;

    return html;
}

$(document).ready(function () {
    $("#input-code-form").validate({
        rules: {
            code: {
                required: true,
                //minlength: 6
            },
            genealogy_tree_id: {
                required: true
            }
        },
        messages: {
            code: {
                required: "Vui lòng nhập mã bảo mật",
                //minlength: "Mật khẩu phải có ít nhất 6 ký tự"
            },
            genealogy_tree_id: {
                required: "Không tìm thấy id cây phả đồ",
            }
        },
        submitHandler: async function (form, e) {
            e.preventDefault();

            let loading = $(form).closest(".modal").find(".loading");
            let notification = $("#notification-code");

            loading.show();
            notification.hide().html("");

            let code = $("#code").val();
            let genealogyTreeId = $("#genealogy-tree-id").val();

            try {
                const response = await axios.post('/api/person/verify-code', { genealogyTreeId, code });
                if (response.data && response.data.success) {
                    localStorage.setItem('GENEALOGY_SECURITY_CODE', code);
                    location.reload();
                } else {
                    notification.show().html(
                        `<div class="alert alert-danger">${response.data.message}</div>`
                    );
                }
            } catch (error) {
                notification.show().html(
                    `<div class="alert alert-danger">Không thể gửi code, vui lòng thử lại</div>`
                );
            } finally {
                loading.hide();
            }
        }
    });

    var showLineNodeSpouse = "SHOW_LINE_NODE_SPOUSE";
    var isCheckedShowLineNodeSpouse = localStorage.getItem(showLineNodeSpouse) === "true";

    $("#showLineNodeSpouse").prop("checked", isCheckedShowLineNodeSpouse);
    $("#hiddenNodeSpouses").prop("checked", isCheckedHiddenNodeSpouses);

    // Gọi sau khi cây phả đồ đã load xong
    $(document).on("treeRendered", function () {
        isCheckedShowLineNodeSpouses = localStorage.getItem(showLineNodeSpouse) === "true";
        $(".children-spouse-link").css("opacity", isCheckedShowLineNodeSpouses ? 1 : 0);
    });

    $("#showLineNodeSpouse").on("change", function () {
        var checked = $(this).is(":checked");
        localStorage.setItem(showLineNodeSpouse, checked);
        $(".children-spouse-link").css("opacity", checked ? 1 : 0);
    });

    $("#hiddenNodeSpouses").on("change", function () {
        var $this = $(this);
        localStorage.setItem(hiddenNodeSpouses, $this.is(":checked"));
        $this.prop("disabled", true);

        // Xoá cây cũ và hiển thị loading
        d3.select('#htree').selectAll('*').remove();
        $('#loading').show();
        $('.phado-tools').hide();
        loadTreeData(treeId, rootId, selectedDeep);


        setTimeout(function () {
            $this.prop("disabled", false);
        }, 4000);
    });

    $(document).on('click', '.btn-relationship', function () {
        $(this).toggleClass('active');
        $('.select-relationship').toggle();
    });

});


//----------------- Các hàm hỗ trợ phả đồ chữ L ------------------

let currentX = 0;
// Tạo tọa độ X cho các node
function assignX(node) {
    if (!node.children || node.children.length === 0) {
        node.x = currentX;
        currentX += spaceNodeX;
    } else {
        node.children.forEach(assignX);

        const firstChild = node.children[0];
        const lastChild = node.children[node.children.length - 1];
        node.x = (firstChild.x + lastChild.x) / 2;
    }

    // Tính khoảng spacing phụ nếu có spouse
    const spouseCount = (node.data.spouses && node.data.spouses.length) ? node.data.spouses.length : 0;
    if (spouseCount > 0) {
        const shiftAmount = spouseCount * (nodeWidth + spaceWithSpouse);
        currentX += shiftAmount;
    }
}

// Tạo tọa độ Y cho các node
function assignY(node, depth = 0) {
    node.y = depth * spaceNodeY; // spacing dọc
    node.depth = depth;
    if (node.children) {
        node.children.forEach(child => assignY(child, depth + 1));
    }
}

//----------------- Kết thúc các hàm hỗ trợ phả đồ chữ L ------------------