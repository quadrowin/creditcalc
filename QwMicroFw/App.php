<?php

namespace QwMicroFw;

/**
 * Created by PhpStorm.
 * User: yury
 * Date: 03.09.2017
 * Time: 10:02
 */

class App
{

    private static $instance;

    private $root;

    private $services = [];

    public function __construct()
    {
        self::$instance = $this;
        $this->root = dirname(__DIR__);
    }

    /**
     * @param string $class
     * @return object|mixed
     */
    public function get($class)
    {
        if (empty($this->services[$class])) {
            $this->services[$class] = new $class;
        }
        return $this->services[$class];
    }

    /**
     * @return App
     */
    public static function getInstance()
    {
        return self::$instance;
    }

    /**
     * @return ResManager
     */
    public function getResManager()
    {
        /** @var ResManager $rm */
        $rm = $this->get(ResManager::class);
        $rm->setRoot($this->root);
        return $rm;
    }

    /**
     * @return string
     */
    public function root()
    {
        return $this->root;
    }

}