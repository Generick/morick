<?php $this->load->view('admin/header'); ?>
    <head>
        <script type="text/javascript" src="<?php echo SITE_RES_ADMIN?>img_jquery.js"></script>
        <script type="text/javascript" src="<?php echo SITE_RES_ADMIN?>img_main.js"></script>
        <style>
            #preview{
                position:absolute;
                border:1px solid #ccc;
                background:#333;
                padding:5px;
                display:none;
                color:#fff;
            }
        </style>
        <link href="<?php echo SITE_RESOURCES?>homeshadowbox3/shadowbox.css" rel="stylesheet" type="text/css" >
        <script language=javascript src="<?php echo SITE_RESOURCES?>js/jquery-1.7.1.min.js" type=text/javascript></script>
        <script src="<?php echo SITE_RESOURCES?>homeshadowbox3/shadowbox.js" type="text/javascript"></script>
        <script type="text/javascript" src="<?php echo SITE_RESOURCES?>js/jquery.switchable[all].min.js"></script>
        <script>
            $(document).ready(function(){
                Shadowbox.init();
                window.api = $("#trigger1").switchable("#panel1 > div > a", {
                    triggerType: "click",
                    effect: "scroll",
                    steps: 3,
                    visible: 3,
                    circular: true
                }).autoplay({ api: true });

                $("#next1").click(function(){
                    api.next();
                });
                $("#prev1").click(function(){
                    api.prev();
                });

            });
        </script>
    </head>
    <script src=scripts/jquery-1.11.0.min.js></script>
    <script src=scripts/json2.js></script>
    <script>
        $(function() {
            var arr = document.getElementsByTagName('button');
            for(var i = 0;i<arr.length;i++){
                arr[i].onclick = function(){
                    if(this.id == "one_yes")
                    {
                        var dataArr = new Array();
                        dataArr[0] = this.value;

                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setPhotoVerified');?>",
                            data: {'userIds':JSON.stringify(dataArr), 'ok':1},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    for(var k=0;k<dataArr.length;k++)
                                    {
                                        var tdName = "td_user_"+dataArr[k];
                                        var td = document.getElementById(tdName);
                                        td.innerText = "通过认证";
                                        td.style.backgroundColor = "#00ff00";
                                    }
                                }
                            }
                        });
                    }
                    else if(this.id == "one_no")
                    {
                        var dataArr = new Array();
                        dataArr[0] = this.value;

                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setPhotoVerified');?>",
                            data: {'userIds':JSON.stringify(dataArr), 'ok':0},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    for(var k=0;k<dataArr.length;k++)
                                    {
                                        var tdName = "td_user_"+dataArr[k];
                                        var td = document.getElementById(tdName);
                                        td.innerText = "认证失败";
                                        td.style.backgroundColor = "#ff0000";
                                    }
                                }
                            }
                        });
                    }
                    else if(this.id == "all_yes"){
                        var checkboxs = document.getElementsByName("checkbox");
                        var dataArr = new Array();
                        for(var i = 0; i < checkboxs.length; i++)
                        {
                            if(checkboxs[i].checked)
                            {
                                dataArr.push(checkboxs[i].value);
                            }
                        }
                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setPhotoVerified');?>",
                            data: {'userIds':JSON.stringify(dataArr), 'ok':1},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    for(var k=0;k<dataArr.length;k++)
                                    {
                                        var tdName = "td_user_"+dataArr[k];
                                        var td = document.getElementById(tdName);
                                        td.innerText = "通过认证";
                                        td.style.backgroundColor = "#00ff00";
                                    }
                                }
                            }
                        });
                    }
                    else if(this.id == "all_no"){
                        var checkboxs = document.getElementsByName("checkbox");
                        var dataArr = new Array();
                        for(var i = 0; i < checkboxs.length; i++)
                        {
                            if(checkboxs[i].checked)
                            {
                                dataArr.push(checkboxs[i].value);
                            }
                        }
                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setPhotoVerified');?>",
                            data: {'userIds':JSON.stringify(dataArr), 'ok':0},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    for(var k=0;k<dataArr.length;k++)
                                    {
                                        var tdName = "td_user_"+dataArr[k];
                                        var td = document.getElementById(tdName);
                                        td.innerText = "认证失败";
                                        td.style.backgroundColor = "#ff0000";
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    </script>
    <table id="list_table" style="margin:20px 0px;" width="100%" cellpadding="0" cellspacing="0" border="1">
        <tbody>
        <tr>
            <td class="header" width="10%">勾选</td>
            <td class="header" width="10%">手机号</td>
            <td class="header" width="10%">姓名</td>
            <td class="header" width="20%">所在位置</td>
            <td class="header" width="20%">头像</td>
            <td class="header" width="10%">身份证件</td>
            <td class="header" width="10%">申请留言</td>
            <td class="header" width="10%">操作</td>
        </tr>
        <?php foreach($washers as $n => $data): ?>
            <tr id="tr_user_<?php echo $data['userId']; ?>">
                <td align="center" class="text_center"><input name="checkbox" type="checkbox" value=<?php echo $data['userId'];?> class="input_hide"></td>
                <td> <?php echo $data['platformId']; ?></td>
                <td><?php echo $data['nickName'];?></td>
                <td><?php echo $data['location'];?></td>
                <td><a href="<?php echo $data['icon']?>" class="preview"><img src="<?php echo $data['smallIcon']?>" alt="gallery thumbnail" /></td>
                <td><a href="<?php echo $data['icon']?>" class="preview"><img src="<?php echo $data['smallIcon']?>" alt="gallery thumbnail" /></td>
                <td><?php echo ""; ?></td>
                <?php
                if($data['photoVerifyState'] == VERIFY_STATE_VERIFYING)
                {
                    // 需要认证
                    $userId = $data['userId'];
                    echo "<td id='td_user_$userId'>需要认证</td>";
                }
                else
                {
                    // 其他不作处理
                    echo "<td></td>";
                }
                ?>
                <td>
                    <form>
                        <span class='input_radio_container'><button type="button" value=<?php echo $data['userId'];?> id=one_yes>通过</button></span>
                        <span class='input_radio_container'><button type="button" value=<?php echo $data['userId'];?> id=one_no>不通过</button></span></form>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

    <span class="input_radio_container"><input type="button" id="like"  value="全选" onClick="selectAll()"></span><br>
    <strong>统一操作：</strong>
    <span class="input_radio_container"><button type="button" id=all_yes>通过</button></span>
    <span class="input_radio_container"><button type="button" id=all_no>不通过</button></span>
    <SCRIPT LANGUAGE="JavaScript">
        function selectAll()
        {
            var desc = document.getElementById("like").value;
            var input = document.getElementsByTagName("input");
            if(desc == "全选")
            {
                document.getElementById("like").value = "取消";
                for (var i=0;i<input.length ;i++ )
                {
                    if(input[i].type=="checkbox")
                    {
                        input[i].checked = true;
                    }
                }
            }
            else
            {
                document.getElementById("like").value = "全选";
                for (var i=0;i<input.length ;i++ )
                {
                    if(input[i].type=="checkbox")
                    {
                        input[i].checked = false;
                    }
                }
            }
        }
    </SCRIPT>
<?php echo $pages; ?>
    <script type="text/javascript">
        page_location('center');
    </script>
<?php $this->load->view('admin/footer'); ?>