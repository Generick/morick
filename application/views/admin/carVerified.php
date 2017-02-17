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

                       var userId = this.value;
                        var carIndex = this.attributes['carIndex'].nodeValue;
                        alert("aaaa");
                        alert(carIndex);

                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setCarVerified');?>",
                            data: {'userId':userId, 'index':carIndex, 'ok':1},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    var tdName = "td_user_"+userId+carIndex;
                                    var td = document.getElementById(tdName);
                                    td.innerText = "通过认证";
                                    td.style.backgroundColor = "#00ff00";
                                }
                            }
                        });
                    }
                    else if(this.id == "one_no")
                    {
                        var userId = this.value;
                        var carIndex =  this.attributes['carIndex'].nodeValue;

                        $.ajax({
                            cache: false,
                            type: "post",
                            url : "<?php echo site_url('admin/setCarVerified');?>",
                            data: {'userId':userId, 'index':carIndex, 'ok':0},
                            success: function(msg){
                                var returns = eval("("+msg+")");//转换为json对象
                                if(returns.err == 0)
                                {
                                    var tdName = "td_user_"+userId+carIndex;
                                    var td = document.getElementById(tdName);
                                    td.innerText = "认证失败";
                                    td.style.backgroundColor = "#ff0000";
                                }
                            }
                        });
                    }
                    else if(this.id == "all_yes"){
                        var checkboxs = document.getElementsByName("checkbox");
                        for(var i = 0; i < checkboxs.length; i++)
                        {
                            if(checkboxs[i].checked)
                            {
                                var userId = checkboxs[i].value;
                                var carIndex =  checkboxs[i].attributes['carIndex'].nodeValue;

                                $.ajax({
                                    cache: false,
                                    type: "post",
                                    url : "<?php echo site_url('admin/setCarVerified');?>",
                                    data: {'userId':userId, 'index':carIndex, 'ok':1},
                                    success: function(msg){
                                        var returns = eval("("+msg+")");//转换为json对象
                                        if(returns.err == 0)
                                        {
                                            var tdName = "td_user_"+userId+carIndex;
                                            var td = document.getElementById(tdName);
                                            td.innerText = "通过认证";
                                            td.style.backgroundColor = "#00ff00";
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else if(this.id == "all_no"){
                        var checkboxs = document.getElementsByName("checkbox");
                        for(var i = 0; i < checkboxs.length; i++)
                        {
                            if(checkboxs[i].checked)
                            {
                                var userId = checkboxs[i].value;
                                var carIndex = checkboxs[i].attributes['carIndex'].nodeValue;
                                $.ajax({
                                    cache: false,
                                    type: "post",
                                    url : "<?php echo site_url('admin/setCarVerified');?>",
                                    data: {'userId':userId, 'index':carIndex, 'ok':0},
                                    success: function(msg){
                                        var returns = eval("("+msg+")");//转换为json对象
                                        if(returns.err == 0)
                                        {
                                            var tdName = "td_user_"+userId+carIndex;
                                            var td = document.getElementById(tdName);
                                            td.innerText = "认证失败";
                                            td.style.backgroundColor = "#ff0000";
                                        }
                                    }
                                });
                        }
                        }
                }
            }
        }
        });
    </script>
    <table id="list_table" style="margin:20px 0px;" width="100%" cellpadding="0" cellspacing="0" border="1">
        <tbody>
        <tr>
            <td class="header" width="10%">勾选</td>
            <td class="header" width="10%">用户ID</td>
            <td class="header" width="10%">昵称</td>
            <td class="header"width="20%">车辆型号</td>
            <td class="header"width="20%">证书缩略图</td>
            <td class="header"width="10%">状态</td>
            <td class="header"width="20%">操作</td>
        </tr>
        <?php foreach($cars as $n => $data): ?>
            <tr id="tr_user_<?php echo $data['userId'] . $data['carIndex']; ?>">
                <td align="center" class="text_center"><input name="checkbox" type="checkbox" value=<?php echo $data['userId'];?> carIndex=<?php echo $data['carIndex'];?> class="input_hide"></td>
                <td> <?php echo $data['userId']; ?></td>
                <td><?php echo $data['nickName'];?></td>
                <td><?php echo $data['carModel'];?></td>
                <td><a href="<?php echo $data['carCert']?>" class="preview"><img src="<?php echo $data['carCert']?>" width="128px" height="128px" alt="gallery thumbnail" /></td>
                <?php
                if($data['verifyState'] == VERIFY_STATE_VERIFYING)
                {
                    // 需要认证
                    $userId = $data['userId'];
                    $carIndex = $data['carIndex'];
                    echo "<td id='td_user_$userId$carIndex'>需要认证</td>";
                }
                else
                {
                    // 其他不作处理
                    echo "<td></td>";
                }
                ?>
                <td>
                    <form>
                        <span class='input_radio_container'><button type="button" value=<?php echo $data['userId'];?> carIndex=<?php echo $data['carIndex'];?> id=one_yes>通过</button></span>
                        <span class='input_radio_container'><button type="button" value=<?php echo $data['userId'];?> carIndex=<?php echo $data['carIndex'];?> id=one_no>不通过</button></span></form>
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
<?php $this->load->view('admin/footer'); ?>