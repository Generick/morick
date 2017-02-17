<?php echo $this->load->view('header'); ?>
    <div class="inde_info_div">
        <div class="iid_title">用户信息</div>
        <div>
            <table width="100%" cellpadding="0" cellspacing="0">
                <tbody>
                <tr>
                    <td width="25%">当前用户</td>
                    <td width="25%"><?php echo $account_data['account_id']; ?></td>
                    <td width="25%">用户类型</td>
                    <td width="25%"><?php echo $account_type; ?></td>
                </tr>
                <tr>
                    <td width="25%">登录 IP</td>
                    <td width="25%"><?php echo $this->input->ip_address(); ?></td>
                    <td width="25%">登录时间</td>
                    <td width="25%"><?php echo $account_data['login_time']; ?></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
<?php echo $this->load->view('footer'); ?>