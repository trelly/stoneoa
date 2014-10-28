<?php
/**
 * Description of System
 *
 * @author terry
 */
class Open_SystemModel {
    
    
    public function Disk(){
        return array(
            'free'=>  disk_free_space(''),
            'total'=> disk_total_space($directory)
        );
    }
    
    public function status(){ 
            $fp = popen('top -b -n 2 | grep -E "^(Cpu|Mem|Tasks)"',"r");
            //获取某一时刻系统cpu和内存使用情况   
            $rs = "";    
            while(!feof($fp)){     
                    $rs .= fread($fp,1024);   
            }  
            pclose($fp);
            $sys_info = explode("\n",$rs);
            $tast_info = explode(",",$sys_info[3]);
            //进程数组   
            $cpu_info = explode(",",$sys_info[4]);  
            //CPU占有量数组   
            $mem_info = explode(",",$sys_info[5]); 
            //内存占有量数组     //正在运行的进程数    
            $tast_running = trim(trim($tast_info[1],'running'));      
            //CPU空闲量    
            $cpu_usage = trim(trim($cpu_info[3],'Cpu(s): '),'%id');  //百分比     
            //内存占有量    
            $mem_total = trim(trim($mem_info[0],'Mem: '),'k total');    
            $mem_used = trim($mem_info[1],'k used');    
            $mem_usage = round(100*intval($mem_used)/intval($mem_total),2);
            //百分比       
            /*硬盘使用率 begin*/    
            $fp = popen('df -lh | grep -E "^(/)"',"r");   
            $rs = fread($fp,1024); pclose($fp);    
            $rs = preg_replace("/\s{2,}/",' ',$rs);  
            //把多个空格换成“_”   
            $hd = explode(" ",$rs);    
            $hd_avail = trim($hd[3],'G'); 
            //磁盘可用空间大小单位G   
            $hd_usage = trim($hd[4],'%'); //挂载点百分比   //print_r($hd);   /*硬盘使用率 end*/       
            //检测时间   
            $fp = popen("date +\"%Y-%m-%d %H:%M\"","r");   
            $rs = fread($fp,1024); 
            pclose($fp);    
            $detection_time = trim($rs); 
            return  array(
                'cpu'=>array('min'=>0,'max'=>100,'cur'=>60),
                'memory'=>array('min'=>0,'max'=>$mem_total,'cur'=>$mem_used),
                'disk'=>array('min'=>0,'max'=>$hd_avail,'cur'=>$hd_avail*$hd_usage/100)
            );  
    }  
    
    public function detected(){
            $fp = popen('top -b -n 2 | grep -E "^(Cpu|Mem|Tasks)"',"r");
            //获取某一时刻系统cpu和内存使用情况   
            $rs = "";    
            while(!feof($fp)){     
                    $rs .= fread($fp,1024);   
            }  
            pclose($fp);
            $sys_info = explode("\n",$rs);
            $tast_info = explode(",",$sys_info[3]);
            //进程数组   
            $cpu_info = explode(",",$sys_info[4]);  
            //CPU占有量数组   
            $mem_info = explode(",",$sys_info[5]); 
            //内存占有量数组     //正在运行的进程数    
            $tast_running = trim(trim($tast_info[1],'running'));      
            //CPU空闲量    
            $cpu_usage = trim(trim($cpu_info[3],'Cpu(s): '),'%id');  //百分比     
            //内存占有量    
            $mem_total = trim(trim($mem_info[0],'Mem: '),'k total');    
            $mem_used = trim($mem_info[1],'k used');    
            $mem_usage = round(100*intval($mem_used)/intval($mem_total),2);
            //百分比       
            /*硬盘使用率 begin*/    
            $fp = popen('df -lh | grep -E "^(/)"',"r");   
            $rs = fread($fp,1024); pclose($fp);    
            $rs = preg_replace("/\s{2,}/",' ',$rs);  
            //把多个空格换成“_”   
            $hd = explode(" ",$rs);    
            $hd_avail = trim($hd[3],'G'); 
            //磁盘可用空间大小单位G   
            $hd_usage = trim($hd[4],'%'); //挂载点百分比   //print_r($hd);   /*硬盘使用率 end*/       
            //检测时间   
            $fp = popen("date +\"%Y-%m-%d %H:%M\"","r");   
            $rs = fread($fp,1024); 
            pclose($fp);    
            $detection_time = trim($rs); 
            return  array(
                    'cpu_usage'=>$cpu_usage,
                    'mem_usage'=>$mem_usage,
                    'hd_avail'=>$hd_avail,
                    'hd_usage'=>$hd_usage,
                    'tast_running'=>$tast_running,
                    'detection_time'=>$detection_time
            );
    }
    
    public function online(){
        return Yaf_Session::getInstance()->count();
    }
}
