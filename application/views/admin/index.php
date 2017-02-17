<?php echo $this->load->view('admin/header'); ?>
    <style type="text/css">
        body{background-color:#c8c8c8; padding:0px;}
        .nav_title{display:none;}
    </style>

    <div id="home_container">
        <!-- 头部 -->
        <div id="hc_header">
            <div style="margin-top: 15px"></div>
        </div>

        <!-- 主体 -->
        <div id="hc_body">
            <!-- 主体导航栏 -->
            <div id="hcb_left">
                <div id="power_list" class="power_list" style="display:block;">
                    <?php foreach($left_menu as $entry_n => $entry_data): ?>
                        <h3><?php echo $entry_data['name']; ?></h3>
                        <div class="pl_nav">
                            <?php foreach($entry_data['sub_entries'] as $sub_entry): ?>
                                <div><a href="<?php echo $sub_entry['url']; ?>" onClick="return nav_in(this);" target='home_iframe'><?php echo $sub_entry['name']; ?></a></div>
                            <?php endforeach; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- 主体内容 -->
            <div id="hcb_right">
                <iframe id="home_iframe" name="home_iframe" frameborder="0" width="100%" height="100%"></iframe>
            </div>

        </div>

        <!-- 下部 -->
        <div id="hc_footer">
            <div id="hcf_left">
                <div id="hcfr_text">
                    <strong>洗车系统数据管理后台</strong>
                </div>
            </div>
            <div id="hcf_right">
                <div id="hcfr_time"><img src="<?php echo SITE_RES_IMAGES; ?>ico_time.png" /> <span id="local_time"></span></div>
            </div>
            <div class="cls"></div>
        </div>
    </div>
<?php echo $this->load->view('admin/footer'); ?>