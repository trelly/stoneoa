<?php
/**
 * Description of StoneAcl
 *
 * @author terry
 */
use Zend\Permissions\Acl;
class StoneAcl extends Acl {
    public function __construct() {
        $this->addRole(new Zend_Acl_Role('guest'));
         //Add a role called user, which inherits from guest
        $this->addRole(new Zend_Acl_Role('user'), 'guest');

         //Add a resource called page
        $this->add(new Zend_Acl_Resource('page'));

        //Add a resource called news, which inherits page
        $this->add(new Zend_Acl_Resource('news'), 'page');

        //Finally, we want to allow guests to view pages
        $this->allow('guest', 'page', 'view');

        //and users can comment news
        $this->allow('user', 'news', 'comment');
    }
}
