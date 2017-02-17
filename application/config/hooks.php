<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

$hook['pre_system'] = array(
    'class' => 'MyHooks',
    'function' => 'preSystem',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);

$hook['post_core_controller'] = array(
    'class' => 'MyHooks',
    'function' => 'postCoreController',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);

$hook['pre_controller'] = array(
    'class' => 'MyHooks',
    'function' => 'preController',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);

$hook['post_controller_constructor'] = array(
    'class' => 'MyHooks',
    'function' => 'postControllerConstructor',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);

$hook['post_controller'] = array(
    'class' => 'MyHooks',
    'function' => 'postController',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);

$hook['post_system'] = array(
    'class' => 'MyHooks',
    'function' => 'postSystem',
    'filename' => 'MyHooks.php',
    'filepath' => 'hooks',
    'params' => array(),
);
