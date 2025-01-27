<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('send-order', function () {
    return true;
});
