require 'slack'

namespace :todo_tasks do
  desc 'Check overdue tasks'
  task check_overdues: :environment do
    Slack.configure do |config|
      config.token = ENV['SLACK_TOKEN']
    end

    me = my_info
    unless me
      puts 'slack user not found'
      exit
    end

    Slack.chat_postMessage(channel: me['id'], text: "期限すぎてますよ〜 at #{now}\n#{overdue_tasks}")
  end

  def my_info
    Slack.im_list['ims'].each do |im|
      user_info = Slack.users_info(user: im['user'])['user']
      if user_info['name'] == ENV['SLACK_USER_NAME']
        return user_info
      end
    end
    nil
  end

  def overdue_tasks
    overdues = Task.unfinished.where.not(deadline: nil)
                              .where('deadline <= ?', Time.now)
    overdues.map { |o| "#{o.content} #{o.deadline.strftime('%F %H:%M')}" }.join("\n")
  end

  def now
    Time.now.strftime('%F %H:%M')
  end
end
