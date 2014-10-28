<?php
/**
 * 用户管理类
 * @author terry
 */
class Open_LongPollingModel {
    
    

    public function __construct() {
        
    }
    
    
    public function longPolling(){
		$timed = time();
        /**while (true) {
			$i = rand(0,100); // 产生一个0-100之间的随机数
			if ($i>50) { // 如果随机数>50视为有效数据，模拟数据发生变化
				$responseTime = time();
				echo "----".($responseTime-$timed).("----result: ".$i.", response time: ".$responseTime.", request time: ".$timed.", use time: ".($responseTime - $timed));
				break; // 跳出循环，返回数据
			} else { // 模拟没有数据变化，将休眠 hold住连接
			 sleep(300);
			}
		}*/
    }
    
}
