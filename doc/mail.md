#邮件系统设计

##邮件系统服务搭建

1. 服务安装过程

	ubuntu服务版默认已经安装邮件服务，如果没有安装邮件服务参考对应的地址 http://blog.sina.com.cn/s/blog_6ad6243801011m1g.html

	ubuntu sendmail先要安装两个包
	sudo apt-get install sendmail
	sudo apt-get install sendmail-cf这两个是必需的

2. 搭建DNS环境，并设置sendmain的主机域名

	可以通过修改“/etc/hosts”和“/etc/sysconfig/network”两个文件更改主机域名。并在DNS服务器中添加对应的MX记录。

3. 邮件服务测试

	**邮件发送测试**

	- 指令mail  yourqq@qq.com   yourqq是qq号码，这里我们用qq邮箱测试一下
	- 输入后会提示 Subject：这是邮件的主题，输入后然后enter会跳转到下一行，这时我们就可以输入邮件的内容了，当你像结束输入的时候换行 
	- Ctrl+D结束输入，会出现Cc：提示，这是抄送提示，你可以在这里输入替邮箱地址，将该邮件转发。然后Enter，邮件就发出去了，
	- 我们可以登录QQ邮箱看看，一般这样的邮件都会被识别为垃圾邮件，所以你可以到垃圾箱看看
	
	**邮件发送测试**

##PHP邮件管理系统
