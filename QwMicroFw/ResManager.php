<?php

namespace QwMicroFw;

/**
 * Created by PhpStorm.
 * User: yury
 * Date: 03.09.2017
 * Time: 9:58
 */

class ResManager
{

    /**
     * @var string
     */
    private $root;

    /**
     * @param array $paths
     * @return string
     */
    public function html(array $paths)
    {
        $result = '';
        foreach ($paths as $path) {
            $mtime = filemtime($this->root . $path);
            $link = $path . (strpos($path, '?') ? '&' : '?') . 't=' . dechex($mtime);
            $js = strpos($path, '.js');
            $css = strpos($path, '.css');
            if ($js > $css) {
                $result .= '<script src="' . htmlspecialchars($link) . '"></script>';
            } else {
                $result .= '<link rel="stylesheet" href="' . htmlspecialchars($link) . '">';
            }
        }
        return $result;
    }

    public function setRoot($root)
    {
        $this->root = $root;
    }

}